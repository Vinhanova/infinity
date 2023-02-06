import { Request } from './types'
import axios from 'axios'

export function useGetAllTickers(tickers: string[]) {
  let initialTickerInfo: Request<{}> = { state: 'pending', data: {} }
  let requestsCounter = 0

  axios
    .all(
      tickers.map(ticker => {
        if (ticker[0] === '^') return
        else return axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
      })
    )
    .then(
      axios.spread((...data) => {
        console.log('data', data)
        data.map(d => (initialTickerInfo.data[tickers[requestsCounter++]] = d?.data.c))
      })
    )
    .catch(error => {
      initialTickerInfo.state = 'error'
      initialTickerInfo.error = error
    })
    .finally(() => (initialTickerInfo.state !== 'error' ? (initialTickerInfo.state = 'success') : (initialTickerInfo.state = 'error')))

  return initialTickerInfo
}
