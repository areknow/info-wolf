export interface Colors {
  backgroundGradient: string[];
  background: string;
  surface1: string;
  surface2: string;
  text: string;
  chart: {
    border: string;
    text: string;
    label: string;
    selection: string;
    plotBand: string;
    plotLine: string;
  };
  theme1: string;
  theme2: string;
  theme3: string;
  theme4: string;
  theme5: string;
  theme6: string;
  shadow1: string;
  shadow2: string;
}

export interface PlotBand {
  from: number;
  to: number;
  color: string;
}
