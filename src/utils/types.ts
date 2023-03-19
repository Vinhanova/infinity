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

export type AssetDic = {
  [ticker: string]: Asset
}

export type Asset = {
  name: string
  quantity: number
  type: string
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
