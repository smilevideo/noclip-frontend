# noclip
An HTML5 game made with Javascript and Phaser 3,Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@smilevideo 
Learn Git and GitHub without any code!
Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.


2
00smilevideo/noclip
 Code Issues 1 Pull requests 0 Projects 0 Wiki Security Insights Settings
noclip
/
README.md
 

1
# noclip
2
An HTML5 game made with Javascript and Phaser 3, with a Rails API backend.
3
​
4
Use your energy to phase through any obstacles to reach the end, but be careful: if you return to material form on top of an obstacle, you will perish!
5
​
6
Users begin by entering their username. A password is not required.
7
​
8
Once the username is submitted, the instructions are provided to the left, the game window is in the middle, and the high scores are on the right.
9
​
10
## Setup
11
For use in a local environment, you must setup both the frontend and the backend. You can clone from this repo.
12
​
13
### Rails(Backend)
14
From the root directory move into:
15
```
16
cd /backend
17
```
18
From the backend directory use Bundler to install Ruby gems:
19
```
20
bundle install
21
```
22
Set up the database:
23
```
24
rails db:create
25
rails db:migrate
26
```
27
Start the server:
28
```
29
rails s
30
```
31
​
32
### JavaScript(Frontend)
33
To run locally, you must use a local server of your choice. [http-server](https://www.npmjs.com/package/http-server) is one option.
34
​
35
Then install http-server:
36
```
37
npm install http-server -g
38
```
39
Once that is done, from the root directory move into:
40
```
41
cd /frontend
42
```
43
Start the server:
44
```
45
http-server
46
```
47
Click one of the provided links from the terminal to open the page in your browser.
@smilevideo
Commit changes
Commit summary
Update README.md
Optional extended description
Add an optional extended description…
 Commit directly to the master branch.
 Create a new branch for this commit and start a pull request. Learn more about pull requests.
 
© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
 with a Rails API backend.

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
