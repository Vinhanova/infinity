import { useEffect, useState } from 'react'
import { Request } from './types'
import axios from 'axios'
import _ from 'underscore'

export function useGetAllTickers(tickers: Request): any {
  const [initialTickersInfo, setInitialTickersInfo] = useState<Request>({ state: 'pending' })

  useEffect(() => {
    if (tickers.state === 'pending') return

    if (tickers.state === 'error') {
      setInitialTickersInfo({ state: 'error', error: 'No tickers found' })
      return
    }

    axios
      .all(
        tickers.data
          .filter((ticker: any) => ticker[0] !== '^') // To remove
          .map((ticker: any) => {
            return axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
          })
      )
      .then(
        axios.spread((...data) => {
          data.map((d: any) => {
            const ticketInfo = d.data
            setInitialTickersInfo(initialTickerInfo => ({ state: 'success', data: { ...initialTickerInfo.data, [d.config.url.match(/symbol=(.*?)&/)[1]]: { id: d.config.url.match(/symbol=(.*?)&/)[1], price: ticketInfo.c, changePercent: ticketInfo.dp } } }))
            //setInitialStocksInfo(initialTickerInfo => ({ state: 'success', data: [...initialTickerInfo.data, { id: d.config.url.match(/symbol=(.*?)&/)[1], price: ticketInfo.c, changePercent: null, ...ticketInfo }] }))
          })
        })
      )
      .catch(error => setInitialTickersInfo({ state: 'error', error: error }))
  }, [tickers])

  return initialTickersInfo
}

export function useGetTicker(ticker: string): any {
  const [loading, setLoading] = useState<boolean>(false)
  const [tickerInfo, setTickerInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (_.isEmpty(ticker)) return

    const controller = new AbortController()
    setLoading(true)

    axios
      .get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`, { signal: controller.signal })
      .then(data => {
        const tickerInfo = data.data

        if (typeof tickerInfo.c !== 'number') setError('Invalid Data')
        else setTickerInfo(tickerInfo)
        //setInitialStocksInfo(initialTickerInfo => ({ state: 'success', data: [...initialTickerInfo.data, { id: d.config.url.match(/symbol=(.*?)&/)[1], price: ticketInfo.c, changePercent: null, ...ticketInfo }] }))
      })
      .catch(error => {
        if (error.code !== 'ERR_CANCELED') setError(error)
      })
      .finally(() => setLoading(false))
  }, [ticker])

  if (error) throw new Error(error)

  return { tickerInfo }
}

export function useGetTickerSuspend(ticker: string): any {
  let loading: boolean = true
  let data: any
  let error: any

  if (_.isEmpty(ticker)) return

  const controller = new AbortController()

  let suspender = axios
    .get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`, { signal: controller.signal })
    .then(data => {
      const tickerInfo = data.data

      if (typeof tickerInfo.c !== 'number') error = 'Invalid Data'
      else data = tickerInfo
      //setInitialStocksInfo(initialTickerInfo => ({ state: 'success', data: [...initialTickerInfo.data, { id: d.config.url.match(/symbol=(.*?)&/)[1], price: ticketInfo.c, changePercent: null, ...ticketInfo }] }))
    })
    .catch(error => {
      if (error.code !== 'ERR_CANCELED') error = error
    })
    .finally(() => (loading = false))

  return {
    read() {
      if (loading) {
        throw suspender
      } else if (error) {
        throw new Error(error)
      } else if (data) {
        return data
      }
    }
  }
}

export const dataFetch = (ticker: string) => {
  const tickerPromise = fetch
  return {
    ticker: wrapPromise(tickerPromise(ticker))
  }
}

export async function fetch(ticker: string): Promise<any> {
  return axios
    .get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
    .then(data => data.data)
    .catch(error => error)
}

export function test(ticker: string) {
  let loading: boolean = true
  let data: any
  let error: any

  let suspend = axios
    .get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
    .then((res: any) => {
      if (typeof res.data.c !== 'number') error = 'Invalid Data'
      else data = res.data
    })
    .catch((err: any) => {
      if (error.code !== 'ERR_CANCELED') error = err
    })
    .finally(() => (loading = false))

  return {
    read() {
      if (loading) {
        throw suspend
      } else if (error) {
        throw new Error(error)
      } else if (data) {
        return data
      }
    }
  }
}

export function test2(tickers: any) {
  let loading: boolean = true
  let data: any
  let error: any

  let suspend = axios
    .all(
      tickers.map((ticker: any) => {
        return axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
      })
    )
    .then(
      axios.spread((...data) => {
        data.map((d: any) => {
          const ticketInfo = d.data
          data = { ...data, [d.config.url.match(/symbol=(.*?)&/)[1]]: { id: d.config.url.match(/symbol=(.*?)&/)[1], price: ticketInfo.c, changePercent: ticketInfo.dp } }
        })
      })
    )
    .catch(error => (error = error))
    .finally(() => (loading = false))

  return {
    read() {
      if (loading) {
        throw suspend
      } else if (error) {
        throw new Error(error)
      } else if (data) {
        console.log(data)
        return data
      }
    }
  }
}

export const wrapPromise = <T>(promise: Promise<T>) => {
  let loading: boolean = true
  let data: any
  let error: any

  let suspend = promise
    .then((res: any) => {
      if (typeof res.c !== 'number') error = 'Invalid Data'
      else data = res
    })
    .catch((err: any) => {
      if (error.code !== 'ERR_CANCELED') error = err
    })
    .finally(() => (loading = false))

  return {
    read() {
      if (loading) {
        throw suspend
      } else if (error) {
        throw new Error(error)
      } else if (data) {
        return data
      }
    }
  }
}
