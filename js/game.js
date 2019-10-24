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


//################# NEW SHIT ####################

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
//   addUser(username)
//   fetchData()
  let game = new Phaser.Game(config)
}

// can get from localStorage
let currentUser;


function welcomePage() {
    currentUser = "";
    aside.innerHTML = "";
    const options = document.createElement('h3');
    options.classList.add('centertext');
    options.innerHTML = '<a href="#" id="sign-in">Sign in</a> or <a href="#" id="new-account">create new account</a>';
    aside.appendChild(options);
}

function welcomePageListeners() {
    //DONE: need event listeners for each anchor element
    let sign_in_choice = document.querySelector('#sign-in');
    sign_in_choice.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('You clicked sign in!');
        aside.innerHTML = "";
        aside.appendChild(oldUsernameForm);
    })

    let new_user_choice = document.querySelector('#new-account');
    new_user_choice.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('You clicked new account!');
        aside.innerHTML = "";
        aside.appendChild(newUsernameForm);
    })
}

// form to create to new user
const newUsernameForm = document.createElement('form');
newUsernameForm.id = 'newUserForm';
const usernameLabel = document.createElement('label');
usernameLabel.innerText = 'Username: ';
const newUsernameInput = document.createElement('input');
const submitBtn = document.createElement('input');
submitBtn.type = 'submit';
submitBtn.value = "Create New User";
newUsernameInput.type = 'text';
newUsernameForm.append(usernameLabel, newUsernameInput,submitBtn);

//form to log in
const oldUsernameForm = document.createElement('form');
oldUsernameForm.id = 'oldUserForm';
const oldUsernameLabel = document.createElement('label');
oldUsernameLabel.innerText = 'Username: ';
const oldUsernameInput = document.createElement('input');
const loginBtn = document.createElement('input');
loginBtn.type = 'submit';
loginBtn.value = "Log In";
oldUsernameInput.type = 'text';
oldUsernameForm.append(oldUsernameLabel, oldUsernameInput,loginBtn);


// after user is signed in, welcome them with their username and list of games
function welcome_existing_user()  {
    // clear out aside element
    aside.innerHTML = "";
    //create h2
    const welcome = document.createElement('h2');
    //set h2 text to welcome user by their username
    welcome.innerText = `Welcome ${currentUser.username}`;
    welcome.classList.add('centertext');
     //add welcome element to aside element
     aside.appendChild(welcome);

    //if user has games, list each game score
    if (currentUser.games.length) {
        const gameTitle = document.createElement('h4');
        gameTitle.innerText = 'Games';
        const gameList = document.createElement('ul');
        currentUser.games.forEach(game => {
            const gameListItem = document.createElement('li');
            gameListItem.innerText = `Score: ${game.score}`;
            gameList.appendChild(gameListItem);
        });
        aside.append(gameTitle, gameList);
    }
    // need option to sign out and go back to previous screen
    const signOutBtn = document.createElement('button');
    signOutBtn.innerText = "Sign Out";
    signOutBtn.addEventListener('click', function() {
        welcomePage();
        welcomePageListeners();
    });
    aside.appendChild(signOutBtn);

}

newUsernameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let newUsername = newUsernameInput.value;

    fetch(USERS_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            user: {
                'username': `${newUsername}`
            }
        })
    })
    .then(resp => resp.json())
    .then(user => console.log(user))
})

oldUsernameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let existingUser = oldUsernameInput.value;
    oldUsernameForm.reset();

    fetch(USERS_URL)
    .then(resp => resp.json())
    .then(users => {
        currentUser = users.find(user => {
            return user.username === existingUser
          });
          signedIn = true;
          console.log(currentUser);
          welcome_existing_user();
    })
})

let signedIn = false;

if (signedIn) {
    // can start new game
    // get score once game is over
}


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
