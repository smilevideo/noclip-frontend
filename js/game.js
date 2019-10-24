import Initializer from './scenes/Initializer.js';
import PlayGame from './scenes/PlayGame.js';
import Victory from './scenes/Victory.js';
import Defeat from './scenes/Defeat.js';

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 650,
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

const userForm = document.getElementById('user_form');
const BASE_URL = "http://localhost:3000";
const userURL = `${BASE_URL}/users`;
const SCORES_URL = `${BASE_URL}/scores`;


userForm.addEventListener('submit', createUser);

// get top 10 game scores
function fetchData() {
    fetch(SCORES_URL)
    .then(res => res.json())
    .then((data) => {
        data.sort(function(a, b) {return b.score - a.score})
        let topTen = data.slice(0, 10)
        topTen.forEach(score => {
            let gamescores = `<h3>${score.user.username} - ${score.score}</h3>`
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
    .then(data => {
        localStorage.setItem('userId', data.id)
        localStorage.setItem('username', data.username)
    })
}

function createUser(e) {
    e.preventDefault();
    let elem = document.getElementById('form-wrapper');
    elem.parentNode.removeChild(elem);

    document.getElementById('users').style.display = "";
    document.getElementById('instructions').style.display = "";
    let username = e.target[0].value;
    console.log(username);
    addUser(username);

    fetchData();

    let game = new Phaser.Game(config);
}