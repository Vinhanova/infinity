import { useEffect, useState } from 'react'
import { Request } from './types'
import axios from 'axios'
import _ from 'underscore'

export function useGetAllStocks(tickers: string[]): any {
  const [initialStocksInfo, setInitialStocksInfo] = useState<Request>({ state: 'pending' })

  useEffect(() => {
    if (_.isEmpty(tickers)) return

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
            setInitialStocksInfo(initialTickerInfo => ({ state: 'success', data: { ...initialTickerInfo.data, [d.config.url.match(/symbol=(.*?)&/)[1]]: { id: d.config.url.match(/symbol=(.*?)&/)[1], price: ticketInfo.c, changePercent: ticketInfo.dp } } }))
            //setInitialStocksInfo(initialTickerInfo => ({ state: 'success', data: [...initialTickerInfo.data, { id: d.config.url.match(/symbol=(.*?)&/)[1], price: ticketInfo.c, changePercent: null, ...ticketInfo }] }))
          })
        })
      )
      .catch(error => setInitialStocksInfo({ state: 'error', error: error }))
  }, [tickers])

  return initialStocksInfo
}

export function useGetStock(ticker: string): any {
  const [initialStockInfo, setInitialStockInfo] = useState<Request>({ state: 'pending' })

  useEffect(() => {
    if (_.isEmpty(ticker)) return

    axios
      .get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
      .then(data => {
        const ticketInfo = data.data
        setInitialStockInfo(initialTickerInfo => ({ state: 'success', data: ticketInfo }))
        //setInitialStocksInfo(initialTickerInfo => ({ state: 'success', data: [...initialTickerInfo.data, { id: d.config.url.match(/symbol=(.*?)&/)[1], price: ticketInfo.c, changePercent: null, ...ticketInfo }] }))
      })
      .catch(error => setInitialStockInfo({ state: 'error', error: error }))
  }, [ticker])

  return initialStockInfo
}
