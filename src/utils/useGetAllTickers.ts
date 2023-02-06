import { useEffect, useState } from 'react'
import { Request } from './types'
import axios from 'axios'

export function useGetAllTickers({ tickers }: any): any {
  const [initialTickerInfo, setInitialTickerInfo] = useState<Request<[]>>({ state: 'pending', data: [] })

  useEffect(() => {
    axios
      .all(
        tickers
          .filter((ticker: any) => ticker[0] !== '^') // To remove
          .map((ticker: any) => {
            return axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
          })
      )
      .then(
        axios.spread((...data) => {
          data.map((d: any) => {
            const ticketInfo = d.data
            setInitialTickerInfo(initialTickerInfo => ({ state: 'success', data: { ...initialTickerInfo.data, [d.config.url.match(/symbol=(.*?)&/)[1]]: ticketInfo } }))
          })
        })
      )
      .catch(error => setInitialTickerInfo({ state: 'error', error: error.message }))
  }, [tickers])

  return initialTickerInfo
}
