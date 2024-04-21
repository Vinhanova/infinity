import { useState, useEffect } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'

type ApiResponse<T> = {
  data: T | null
  error: AxiosError | null
  isLoading: boolean
}

export function useAxios<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(url)
        setData(response.data)
      } catch (err: any) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Cleanup function to cancel the request if component unmounts
    return () => {
      // Cancel the request if it's still pending
    }
  }, [url]) // Dependency array ensures useEffect runs when URL changes

  return { data, error, isLoading }
}
