import styles from './about.module.scss';
import { HEADING } from './contants';

export const About = () => {
  return (
    <div className={styles.about}>
      <h1>{HEADING}</h1>
      <p>
        HOWL is a system monitoring application with a beautiful dashboard
        interface. It can be run on a personal computer or a server to collect
        system metrics and display them in a neat dashboard. The server uses a
        websocket to push collected system metrics to the client every second.
        The node process collects data about the machine CPU, memory, and other
        interesting statistics. The API also sets up an interval to
        intermittently refresh the socket data. The client subscribes to this
        socket connection and stores the metric data in context to feed the
        graphical components.
      </p>

      <h2>Features</h2>
      <ul>
        <li>React frontend</li>
        <li>Express backend</li>
        <li>Websocket network connection</li>
        <li>Darkmode dynamically detected from system, with toggle</li>
        <li>Highcharts time series chart with zoom selection</li>
        <li>CPU overage alerts as plot bands and warnings in chart</li>
        <li>CPU overage recovery toast alert messages</li>
        <li>Custom CPU threshold and duration settings</li>
        <li>Apex charts for secondary charting widgets</li>
        <li>Responsive layout for large, medium, and small devices</li>
      </ul>

      <h2>Time series chart usage</h2>
      <p>
        The time series chart shows CPU and memory usage over time. It also has
        support for alerting the user of CPU overage based on variable threshold
        (shown with a horizontal line) as well as the duration of the violation.
        These settings can be tuned to a users requirements.
      </p>
      <p>
        When HOWL detects an overage in the CPU usage that has violated the
        threshold for a certain duration, it will highlight these overage areas
        with red areas in the chart. Clicking on the "more" button in the right
        corner of the chart will alow the user to change the duration and
        threshold settings.
      </p>
      <p>
        When overages exist, a red "warnings" button will be visible next to the
        "more" button. The "warnings" button can be clicked to access the list
        of current and historical overages. Please note that this list does
        scroll.
      </p>
      <p>
        The chart has a selection feature that allows the user to zoom in on
        certain areas of data. Simply click drag the cursor horizontally over
        the area of interest to activate the zoom. Once the zoom is no longer
        needed, a new "zoom out" button will be visible next to the "more"
        button. Clicking the "zoom out" will reset the chart time frame.
      </p>

      <h2>Dark mode</h2>
      <p>
        HOWL will automatically detect your operating systems color scheme
        preferences and adapt to what is being used. If this is not desired,
        simply click on the "dark mode" toggle in the top right corner of the
        application.
      </p>

      <h2>Additional details or help</h2>
      <p>
        For further documentation please take a look at the{' '}
        <a
          href="https://github.com/areknow/info-wolf"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{' '}
        page. If you have any problems or thoughts on improving HOWL, please
        open an issue.
      </p>
      <p>Thank you for your interest!</p>
    </div>
  );
};
