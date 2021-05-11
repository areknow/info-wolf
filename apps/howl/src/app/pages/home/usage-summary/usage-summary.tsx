import Highcharts from 'highcharts';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DARK_THEME, LIGHT_THEME } from '../../../common/colors';
import {
  Card,
  DropMenu,
  Stepper,
  TimeSeriesChart,
} from '../../../common/components';
import { useDarkModeContext, useWsContext } from '../../../common/context';
import {
  HISTORICAL_BANDS,
  VIOLATION_DURATION,
  VIOLATION_THRESHOLD,
} from './constants';
import {
  calculateOverage,
  checkForAlerts,
  createSeries,
  recordHistoricalOverage,
} from './utils';
import { Warnings } from './warnings';

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const StyledWarningIcon = styled.i<{ color: string }>`
  color: ${({ color }) => color};
  top: -1px;
`;

const StyledMoreIcon = styled.i`
  --ggs: 0.85;
`;

const StyledSteppers = styled.div`
  > *:first-child {
    margin-bottom: 20px;
  }
`;

const StyledZoomButton = styled.button`
  all: unset;
  cursor: pointer;
  height: 24px;
  width: 24px;
  z-index: 1;
  i {
    top: -2px;
  }
`;

export const UsageSummary = () => {
  const { data } = useWsContext();
  const [series, setSeries] = useState<Highcharts.SeriesOptionsType[]>([]);
  const [bands, setBands] = useState([]);
  const [duration, setDuration] = useState(VIOLATION_DURATION);
  const [threshold, setThreshold] = useState(VIOLATION_THRESHOLD);
  const [configOpen, setConfigOpen] = useState(false);
  const [warningsOpen, setWarningsOpen] = useState(false);
  const [recovered, setRecovered] = useState([]);
  const [chartZoomed, setChartZoomed] = useState(false);

  const { dark } = useDarkModeContext();
  const colors = dark ? DARK_THEME : LIGHT_THEME;

  useEffect(() => {
    setSeries(createSeries(data.timeSeries, colors));
    setBands(
      calculateOverage(
        data.timeSeries.cpuUsageData,
        duration,
        threshold,
        colors
      )
    );
  }, [colors, data.timeSeries, duration, threshold]);

  useEffect(() => {
    setRecovered(recordHistoricalOverage(bands, HISTORICAL_BANDS));
  }, [bands]);

  return (
    <Card
      title="Usage over time"
      overlayOpen={configOpen || warningsOpen}
      onOverlayClick={() => {
        setConfigOpen(false);
        setWarningsOpen(false);
      }}
      actions={
        <StyledActions>
          {chartZoomed && (
            <StyledZoomButton
              onClick={() => {
                Highcharts.charts[0].zoomOut();
                setChartZoomed(false);
              }}
            >
              <i className="gg-zoom-out" />
            </StyledZoomButton>
          )}
          {checkForAlerts(bands) && (
            <DropMenu
              show={warningsOpen}
              icon={
                <StyledWarningIcon
                  color={colors.theme6}
                  className="gg-danger"
                />
              }
              onTriggerClick={() => {
                setConfigOpen(false);
                setWarningsOpen(!warningsOpen);
              }}
            >
              <Warnings bands={bands} recovered={recovered} />
            </DropMenu>
          )}
          <DropMenu
            show={configOpen}
            icon={<StyledMoreIcon className="gg-more-vertical-o" />}
            onTriggerClick={() => {
              setWarningsOpen(false);
              setConfigOpen(!configOpen);
            }}
          >
            <StyledSteppers>
              <Stepper
                label="Duration"
                value={duration}
                step={10000}
                minimum={10000}
                type="time"
                onChange={(value) => setDuration(value)}
              />
              <Stepper
                label="Threshold"
                value={threshold}
                step={5}
                minimum={10}
                type="percent"
                onChange={(value) => setThreshold(value)}
              />
            </StyledSteppers>
          </DropMenu>
        </StyledActions>
      }
    >
      <TimeSeriesChart
        series={series}
        bands={bands}
        threshold={threshold}
        onZoom={() => setChartZoomed(!chartZoomed)}
      />
    </Card>
  );
};
