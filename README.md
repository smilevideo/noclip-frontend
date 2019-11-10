# noclip
An HTML5 game made with Javascript and Phaser 3, with a Rails API backend.

Demo deployed here: https://smilevideo.github.io/noclip-frontend/

Use your energy to phase through any obstacles to reach the end, but be careful: if you return to material form on top of an obstacle, you will perish!

Users begin by entering their username. A password is not required.

Once the username is submitted, the instructions are provided to the left, the game window is in the middle, and the high scores are on the right.

## Setup
For use in a local environment, you must setup both the frontend and the backend. You can clone from this repo.

### Rails(Backend)
From the root directory move into:
```
cd /backend
```
From the backend directory use Bundler to install Ruby gems:
```
bundle install
```
Set up the database:
```
rails db:create
rails db:migrate
```
Start the server:
```
rails s
```

### JavaScript(Frontend)
To run locally, you must use a local server of your choice. [http-server](https://www.npmjs.com/package/http-server) is one option.

Then install http-server:
```
npm install http-server -g
```
Once that is done, from the root directory move into:
```
cd /frontend
```
Start the server:
```
http-server
```
Click one of the provided links from the terminal to open the page in your browser.

Click the front end folder on the web page.

## Controls:

Arrow keys: thrust

Space: noclip

Shift: stop

## Current Bugs:
- Collisions not always recognized

## Thanks to:
Framework: [Phaser 3](phaser.io)

Page background: [LuminousDragonGames on opengameart.org](https://opengameart.org/content/perfectly-seamless-night-sky)

UFO sprite: [MillionthVector](http://millionthvector.blogspot.de)

Goal animation: [Grahhhhh on opengameart.org](https://opengameart.org/content/animated-blue-ring-explosion)

Side Pillars: [FunwithPixels on opengameart.org](https://opengameart.org/content/sci-fi-blue-pillar)

The rest of the images: from Phaser 3's examples' assets
