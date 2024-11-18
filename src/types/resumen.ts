export type Data = {
  info: Info
  price: Price
}

export type Info = {
  name: string
  shortName: string
  countryName: string
  currencyName: string
  currencySymbol: string
  codeInstrument: string
  marketName: string
  hourOpen: string
  hourClose: string
  trading: boolean
  exchangeRate: number
}

export type Price = {
  lastPrice: number
  datetimeLastPrice: string
  openPrice: number
  closePrice: number
  datetimeClosePrice: string
  performanceAbsolute: number
  performanceRelative: number
  bid: number
  bidVolume: number
  bidDatetime: string
  ask: number
  askVolume: number
  askDatetime: string
  volumeMoney: number
  accumulatedVolumeMoney: number
  volumeInstrument: number
  accumulatedVolumeInstrument: number
  tend: string
  maxDay: number
  minDay: number
  min52W: number
  max52W: number
  pct30D: number
  pctRelW52: number
  pctRelCY: number
}
