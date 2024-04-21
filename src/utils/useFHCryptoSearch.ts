import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useAxios } from './useAxios'

const useFHCryptoSearch = () => {
  const [initialTickersInfo, setInitialTickersInfo] = useState<Request>({ state: 'pending' })
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (tickers.state === 'pending') return

    if (tickers.state === 'error') {
      setInitialTickersInfo({ state: 'error', error: 'No tickers found' })
      return
    }

    const { data, error, isLoading } = useAxios(`https://finnhub.io/api/v1/crypto/symbol?exchange=coinbase&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)
  })
}

export default useFHCryptoSearch
