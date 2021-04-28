/**
 * Instead of using the npm package 'os-utils'
 * I am using a not yet merged source since it
 * has support for awaiting which simplifies the
 * API logic immensely.
 * https://github.com/oscmejia/os-utils/pull/11
 */

import os = require('os');
import childProcess = require('child_process');

export const platform = () => process.platform;

export const cpuCount = () => os.cpus().length;

// System uptime in seconds
export const sysUptime = () => os.uptime();

// Process uptime in seconds
export const processUptime = () => process.uptime();

// Memory
export const freemem = () => os.freemem() / (1024 * 1024);

export const totalmem = () => os.totalmem() / (1024 * 1024);

export const freememPercentage = () => os.freemem() / os.totalmem();

// Only Linux
export const freeCommand = () =>
  new Promise((resolve, reject) => {
    childProcess.exec('free -m', (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      const lines = stdout.split('\n');

      const strMemInfo = lines[1].replace(/[\s\n\r]+/g, ' ');

      const memInfo = strMemInfo.split(' ');

      const totalMem = parseFloat(memInfo[1]);
      const freeMem = parseFloat(memInfo[3]);
      const buffersMem = parseFloat(memInfo[5]);
      const cachedMem = parseFloat(memInfo[6]);

      const usedMem = totalMem - (freeMem + buffersMem + cachedMem);

      resolve(usedMem - 2);
    });
  });

// HDD usage
export const harddrive = () =>
  new Promise((resolve, reject) => {
    childProcess.exec('df -k', (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      const lines = stdout.split('\n');

      const strDiskInfo = lines[1].replace(/[\s\n\r]+/g, ' ');

      const diskInfo = strDiskInfo.split(' ');

      const total = Math.ceil((Number(diskInfo[1]) * 1024) / 1024 ** 2);
      const used = Math.ceil((Number(diskInfo[2]) * 1024) / 1024 ** 2);
      const free = Math.ceil((Number(diskInfo[3]) * 1024) / 1024 ** 2);

      resolve({ total, free, used });
    });
  });

// Return running processes
export const getProcesses = (nProcess) =>
  new Promise((resolve, reject) => {
    const nP = nProcess || 0;

    let command = `ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n${10}`;
    if (nP > 0) {
      command = `ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n${nP + 1}`;
    }

    childProcess.exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      const lines = stdout.split('\n');
      lines.shift();
      lines.pop();

      let result = '';

      lines.forEach((item) => {
        const str = item.replace(/[\s\n\r]+/g, ' ');

        const splitString = str.split(' ');

        result += `${splitString[1]} ${splitString[2]} ${
          splitString[3]
        } ${splitString[4].substring(splitString[4].length - 25)}\n`; // process
      });

      resolve(result);
    });
  });

// Returns all the load average usage for 1, 5 or 15 minutes.
export const allLoadavg = () => {
  const loads = os.loadavg();

  return `${loads[0].toFixed(4)},${loads[1].toFixed(4)},${loads[2].toFixed(4)}`;
};

// Returns the load average usage for 1, 5 or 15 minutes.
export const loadavg = (time) => {
  let t = time;

  if (time === undefined || (time !== 5 && time !== 15)) t = 1;

  const loads = os.loadavg();
  let v = 0;
  if (t === 1) v = loads[0];
  if (t === 5) v = loads[1];
  if (t === 15) v = loads[2];

  return v;
};

function getCPUInfo() {
  const cpus = os.cpus();

  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;

  Object.values(cpus).forEach((cpu) => {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys += cpu.times.sys;
    irq += cpu.times.irq;
    idle += cpu.times.idle;
  });

  const total = user + nice + sys + idle + irq;

  return {
    idle,
    total,
  };
}

function getCPUUsage(free) {
  return new Promise((resolve) => {
    const stats1 = getCPUInfo();
    const startIdle = stats1.idle;
    const startTotal = stats1.total;

    setTimeout(() => {
      const stats2 = getCPUInfo();
      const endIdle = stats2.idle;
      const endTotal = stats2.total;

      const idle = endIdle - startIdle;
      const total = endTotal - startTotal;
      const perc = idle / total;

      resolve(free === true ? perc : 1 - perc);
    }, 1000);
  });
}

export const cpuFree = () => getCPUUsage(true);

export const cpuUsage = () => getCPUUsage(false);