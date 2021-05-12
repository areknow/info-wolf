jest.mock('react-apexcharts', () =>
  jest.fn(() => {
    return null;
  })
);
jest.mock('apexcharts', () => ({
  exec: jest.fn(() => {
    return new Promise((resolve) => {
      resolve('uri');
    });
  }),
}));
