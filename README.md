
<p align="center">
  <a href="https://alphacomponents.dev">
    <img width="500" src="https://howl.netlify.app/assets/git-banner-image.svg">
  </a>
</p>

<h1 align="center">HOWL | infowolf</h1>

<div align="center">

Beautiful system monitoring dashboard. Howl at the processor.

[![Netlify Status](https://api.netlify.com/api/v1/badges/0b1461e0-06d1-46cf-91eb-4b417b660c4b/deploy-status)](https://app.netlify.com/sites/howl/deploys)
[![build workflow](https://github.com/areknow/info-wolf/actions/workflows/build.yml/badge.svg)](https://github.com/areknow/info-wolf/actions/workflows/build.yml)
[![lint workflow](https://github.com/areknow/info-wolf/actions/workflows/lint.yml/badge.svg)](https://github.com/areknow/info-wolf/actions/workflows/lint.yml)
[![test workflow](https://github.com/areknow/info-wolf/actions/workflows/test.yml/badge.svg)](https://github.com/areknow/info-wolf/actions/workflows/test.yml)

<div style="width: 600px">

![preview](.github/assets/preview.png)

</div>

</div>

## Project details

HOWL is a system monitoring application. It can be run on a personal computer or a server to collect system metrics and display them in a neat dashboard. The server uses a websocket to push collected system metrics to the client every second. The node process collects data about the machine CPU, memory, and other interesting statistics. The API also sets up an interval to intermittently refresh the socket data. The client subscribes to this socket connection and stores the metric data in context to feed the graphical components.

The original requirements was for a 10 second interval, but a 1 second interval creates a much smoother sliding window effect.

### Demo
https://howl.netlify.app/

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
```shell
// install dependencies
$ npm i

// start the server
$ nx serve api

// start the client
$ nx serve howl
```
### Testing
```shell
// install dependencies
$ npm i

// run all unit tests across the monorepo
$ npm run test-all
```
## Deployment
The app is currently deployed using Heroku for the server and Netlify for the client. Checkout the live demo [here](https://howl.netlify.app/), but please note that the Heroku free tier dyno that receives no traffic for 30 minutes will sleep. You may see a loading indicator for upwards of 30 seconds before the server is awake and sending socket data. Thank you for your patience.

## Features
- React frontend
- Express backend
- Websocket network connection
- NX monorepo structure
- Darkmode dynamically detected from system, with toggle
- Highcharts time series chart with zoom selection
- CPU overage alerts as plot bands and warnings in chart
- CPU overage recovery toast alert messages
- Custom CPU threshold and duration settings
- Apex charts for secondary charting widgets
- Responsive layout for large, medium, and small devices
- Unit test coverage

## Project structure
The project uses a NX monorepo to organize the client and server code. This allows for shared API interfaces.
- apps
  - api
  - howl
  - howl-e2e
- libs
  - api-interfaces

### Client (howl)
- common
  - colors
  - components
    - bar-chart
    - card
    - drop-menu
    - gauge-chart
    - global-nav
    - info-group
    - loader
    - pie-chart
    - stepper
    - time-series-chart
      - tooltip
  - context
    - dark-mode
    - websocket
  - types
- pages
  - about
  - home
    - cpu
    - load
    - memory
    - system-statistics
    - usage-summary
      - warnings
- app.tsx

### Server (api)
- app
  - constants
  - socket
  - utils
- main.ts

## Monitoring
The application is currently monitored across the stack with Datadog. The backend API layer has the Datadog heroku build pack installed. The client application has the Datadog log javascript agent installed.

## Screenshots

Dashboard in light mode
![alt](.github/assets/dashboard-light-mode.png)

Dashboard in dark mode
![alt](.github/assets/dashboard-dark-mode.png)

Alerts panel open with active and historical overages visible
![alt](.github/assets/warnings-panel-open.png)

Threshold settings panel open with custom duration and threshold
![alt](.github/assets/threshold-panel-open.png)

Chart selection zoom active with tooltip
![alt](.github/assets/chart-zoomed.png)

Visible alert for CPU threshold violation recovery
![alt](.github/assets/recovery-alert.png)