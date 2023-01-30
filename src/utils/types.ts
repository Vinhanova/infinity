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
  value: T
  error?: any
}

export type Auth = {
  googleSignIn?: any
  logOut?: any
  user?: any
}
