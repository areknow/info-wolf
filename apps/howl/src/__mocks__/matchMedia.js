/* eslint-disable @typescript-eslint/no-empty-function */

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => {},
  }),
});

module.exports = window;
