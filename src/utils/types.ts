export type Payment = {
  title: string
  price: number
  category: string
  date?: {
    seconds: number
    milliseconds: number
  }
}

export type Day = {
  nr: number
  outOfBounds: boolean
}

export type MonthlyPaymentsDic = {
  [day: number]: string[]
}

// T
export type Request = {
  state: string
  data?: any
  error?: any
}

export type Auth = {
  googleSignIn?: any
  logOut?: any
  user?: any
}

export type AssetDic = {
  [ticker: string]: Asset
}

export type Asset = {
  name: string
  quantity: number
  type: 'stock' | 'cryptocurrency'
  state: string
}

export type yHStock = {
  change: number
  changePercent: number
  dayVolume: number
  exchange: string
  id: string
  lastSize: number
  marketHours: number
  price: number
  priceHint: number
  quoteType: number
  time: number
}

export type StockSearchType = {
  description: string
  displaySymbol: string
  symbol: string
  type: string
  currency: string
  figi: string
  isin: string
  mic: string
  shareClassFIGI: string
  symbol2: string
}
