import os = require('os-utils');

const percentage = [];
setInterval(() => {
  os.cpuUsage(function (percent) {
    percentage.push({ date: new Date(), percent });
  });
}, 1000);
