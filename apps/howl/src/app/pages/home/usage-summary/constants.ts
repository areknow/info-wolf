import { Slide, ToastOptions } from 'react-toastify';
import { Colors } from '../../../common/types';

/** Store the app startup time */
export const APP_START_DATE = new Date().valueOf();
/** Date format used in warnings modal */
export const DATE_FORMAT = 'h:mm:ss';
/** Used to store historical plot bands once recovered */
export const HISTORICAL_BANDS = [];
/** Percentage that must be exceeded or equal to for warning to appear */
export const VIOLATION_THRESHOLD = 80;
/** Duration that must be exceeded for warning to appear */
export const VIOLATION_DURATION = 120000;
/** Toast message when CPU violation has ended */
export const TOAST_RECOVERED_MESSAGE = 'CPU threshold violation has ended.';
/** Memory series name */
export const MEMORY_SERIES_NAME = 'Memory usage';
/** CPU series name */
export const CPU_SERIES_NAME = 'CPU usage';
/** CPU threshold name */
export const CPU_THRESHOLD_NAME = 'CPU threshold';
/** Options for the toast message. Pass in dynamic colors for styling. */
export const TOAST_OPTIONS = (colors: Colors): ToastOptions => {
  return {
    position: 'bottom-right',
    autoClose: 5000,
    closeButton: false,
    hideProgressBar: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    transition: Slide,
    style: {
      background: colors.surface2,
      color: colors.text,
      boxShadow: colors.shadow2,
    },
  };
};
