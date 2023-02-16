import { useEffect, useState } from 'react'
import { Request } from './types'
import axios from 'axios'

export function useGetAllStocks(tickers: any): any {
  const [initialStocksInfo, setInitialStocksInfo] = useState<Request>({ state: 'pending', data: [] })

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
            //setInitialStocksInfo(initialTickerInfo => ({ state: 'success', data: { ...initialTickerInfo.data, [d.config.url.match(/symbol=(.*?)&/)[1]]: ticketInfo } }))
            setInitialStocksInfo(initialTickerInfo => ({ state: 'success', data: [...initialTickerInfo.data, { id: d.config.url.match(/symbol=(.*?)&/)[1], price: ticketInfo.c, changePercent: null, ...ticketInfo }] }))
            //setInitialStocksInfo(initialTickerInfo => ({ state: 'success', data: [...initialTickerInfo.data, ticketInfo] }))
          })
        })
      )
      .catch(error => setInitialStocksInfo({ state: 'error', error: error.message }))
  }, [tickers])

  return initialStocksInfo
}