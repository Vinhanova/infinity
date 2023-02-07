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

export type Request<T> = {
  state: string
  data?: any
  error?: any
}

export type Auth = {
  googleSignIn?: any
  logOut?: any
  user?: any
}

export type userStocks = {
  [ticker: string]: userStock
}

export type userStock = {
  name: string
  quantity: number
  watchlist: boolean
}
