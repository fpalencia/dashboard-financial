export type Data = {
  info: Info;
  constituents: Constituent[];
}

export type Info = {
  name: string;
  shortName: string;
  countryName: string;
  codeInstrument: string;
}

export type Constituent = {
  codeInstrument: string;
  shortName: string;
  lastPrice: number;
  accumulatedVolumeMoney: number;
  pctDay: number;
  pct30D: number;
  pct1Y: number;
  pctCY: number;
}