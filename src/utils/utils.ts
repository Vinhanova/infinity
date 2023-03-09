export function toFixed(num: number, fixed: number): number {
  if (!num) return 0

  var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
  return +num?.toString()?.match(re)![0]
}

export function findKey(obj: any, value: any): string {
  return Object.keys(obj).find(key => obj[key] === value)!
}
