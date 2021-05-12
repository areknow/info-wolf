/**
 * Utils to format values for the system stats.
 * Formatter functions also used in the test suite.
 */

import { formatDistance } from 'date-fns';

export const formatPlatformValue = (value: string) => {
  return value.toUpperCase();
};

export const formatSystemUptimeValue = (value: number) => {
  return formatDistance(0, value * 1000, {
    includeSeconds: true,
  });
};

export const formatTotalMemoryValue = (value: number) => {
  return `${(value / 1024 / 1024 / 1024).toFixed(2)} GB`;
};

export const formatFreeMemoryValue = (value: number) => {
  return `${(value / 1024).toFixed(2)} GB`;
};
