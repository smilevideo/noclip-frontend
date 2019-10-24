import Initializer from './scenes/Initializer.js';
import PlayGame from './scenes/PlayGame.js';
import Victory from './scenes/Victory.js';
import Defeat from './scenes/Defeat.js';

let config = {
    type: Phaser.WEBGL,
    width: 768,
    height: 768,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: true,
            setBounds: true
        }
    },
    title: 'noclip',
    version: '.0001',
    scene: [
        Initializer,
        PlayGame,
        Victory,
        Defeat
    ],
    parent: 'game'
};


//################# NEW STUFF ####################

const userForm = document.getElementById('user_form')
const scoreinput = document.getElementById('score')
const BASE_URL = "http://localhost:3000";
const userURL = `${BASE_URL}/users`
const GAMES_URL = `${BASE_URL}/games`;


userForm.addEventListener('submit', createUser)

// get top 10 game scores
function fetchData() {
  fetch(GAMES_URL)
    .then(res => res.json())
    .then((data) => {
      data.sort(function(a, b) {return b.score - a.score})
      let topTen = data.slice(0, 10)
      topTen.forEach(game => {
        let gamescores = `<h3>${game.user.username} - ${game.score}</h3>`
        document.getElementById('topgames').innerHTML += gamescores
      })
    })
}


function addUser(username) {
  fetch(userURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
            'username': username
        }
    })
  })
    .then(res => res.json())
    .then(data => localStorage.setItem('user_id', data.id))
}

function createUser(e) {
  e.preventDefault()
  document.getElementById('form').style.display = "none"
  document.getElementById('users').style.display = ""
  let username = e.target[0].value
  console.log(username);
  addUser(username)
  currentUser = localStorage.user_id;
  fetchData()
  let game = new Phaser.Game(config)
}

// can get from localStorage
let currentUser;

// create game when game is over
function createGame() {
    return fetch('http://localhost:3000/games', {
        method: "POST",
        headers: {
            'Content_Type' : 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            game: {
              'user_id': currentUser.id,
              'score': score
            }
        })
    })
}
