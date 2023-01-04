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
  [day: number]: Array<string>
}
