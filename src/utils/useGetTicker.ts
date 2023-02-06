import { useEffect, useState } from 'react'
import { Request } from './types'
import axios from 'axios'

export function useGetTicker(ticker: string) {
  const [tickerInfo, setTickerInfo] = useState<Request<{}>>({ state: 'pending', data: [] })

  useEffect(() => {
    var url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${import.meta.env.ALPHAVANTAGE_API_KEY}`

    axios
      .get(url)
      .then(data => setTickerInfo({ state: 'success', data: data.data }))
      .catch(error => setTickerInfo({ state: 'error', error: error }))
  }, [])

  useEffect(() => {
    console.log(tickerInfo.state === 'success' && tickerInfo.data['Global Quote']['05. price'])
  }, [tickerInfo])

  return tickerInfo
}
