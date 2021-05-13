import { INTERVAL } from '../constants';
import { initTimeSeriesArray, scrollTimeSeriesArray } from './index';

describe('API utils', () => {
  it('should create array with length matching duration', () => {
    const duration = 10;
    const result = initTimeSeriesArray(INTERVAL, duration);
    expect(result.length).toEqual(duration);
  });

  it('should create array with items incrementing by interval', () => {
    const interval = 10;
    const result = initTimeSeriesArray(interval, 10);
    expect(result[1].x - result[0].x).toEqual(interval);
  });

  it('should scroll array', () => {
    const mockArray = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ];
    scrollTimeSeriesArray(mockArray, 4, 4);
    expect(mockArray).toEqual([
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
    ]);
  });
});
