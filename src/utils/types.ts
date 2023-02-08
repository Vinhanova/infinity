export type Payment = {
  id: string
  title: string
  price: number
  category: string
  date: string
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

export type userStockDic = {
  [ticker: string]: userStock
}

export type userStock = {
  name: string
  quantity: number
  watchlist: boolean
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
