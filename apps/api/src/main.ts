import * as express from 'express';
import os = require('os-utils');

const app = express();

const percentage = [];
setInterval(() => {
  os.cpuUsage(function (percent) {
    console.log([new Date().valueOf(), percent]);
    percentage.push([new Date().valueOf(), percent]);
  });
}, 1000);

app.get('/api/v1/time-series', (req, res) => {
  res.send(percentage);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
