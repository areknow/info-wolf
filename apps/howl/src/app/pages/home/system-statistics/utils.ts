/**
 * Utils to format values for the system stats.
 * Formatter functions also used in the test suite.
 */

import { formatDistance } from 'date-fns';
import { NOT_AVAILABLE_LABEL, NOT_SUPPORTED_VALUE } from './constants';

export const formatPlatformValue = (value: string) => {
  return value.toUpperCase();
};

export const formatOperatingSystemValue = (value: string) => {
  return value === NOT_SUPPORTED_VALUE ? NOT_AVAILABLE_LABEL : value;
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
