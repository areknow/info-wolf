# HOWL | infowolf

## Project
https://howl.netlify.app/

HOWL is a system monitoring application. It can be run on a laptop or a server to collect system metrics and display them in a neat dashboard. The server uses websockets to push collected metrics to the client every second. The original requirements was for a 10 second interval, but a 1 second interval creates a much smoother sliding window effect.

### Requirements 
- The front-end application should communicate with a local back-end service to retrieve CPU load average information from your computer.
- The front-end application should retrieve CPU load information every 10 seconds.
- The front-end application should maintain a 10 minute window of historical CPU load information.
- The front-end application should alert the user to high CPU load.
- The front-end application should alert the user when CPU load has recovered.
- The alerting logic in your application should have tests.

## Getting started
Please follow the steps below to run the application locally. Make sure you are running the latest version of Node and have NPM or Yarn installed. If you do not have NX globally installed, prefix the commands with `npx`.

### Local development
```sh
// install dependencies
$ npm i

// start the server
$ nx serve api

// start the client
$ nx serve howl
```
### Testing
```sh
$ npm i
$ npm run test-all
```
### Publishing
The app is currently deployed using Heroku for the server and Netlify for the client. Checkout the live demo [here](https://link), but please note that the Heroku free tier dyno that receives no traffic for 30 minutes will sleep. You may see a loading indicator for upwards of 30 seconds before the server is awake and sending socket data. Thank you for your patience 😬

## Features
## project structure