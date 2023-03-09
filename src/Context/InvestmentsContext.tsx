import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { useDocFirestore } from '../utils/useGetFirestore'
import { Request, userStockDic } from '../utils/types'
import { useGetAllTickers, useGetTicker } from '../utils/useGetTickers'
import { useYFWebSocket } from '../utils/useYFWebSocket'
import { useUserAuth } from './AuthContext'
import { findKey, toFixed } from '../utils/utils'
import _ from 'underscore'

type Props = {
  children: ReactNode
}

const InvestmentsContext = createContext<any>({})

export const InvestmentsContextProvider: FC<Props> = ({ children }) => {
  const { user } = useUserAuth()
  const [tickers, setTickers] = useState<Request>({ state: 'pending' })

  const { state: userTickersState, data: userTickersData, error: userTickersError } = useDocFirestore<userStockDic>(`stocks`, user.uid)
  const { state: exchangeRateInfoState, data: exchangeRateInfoData, error: exchangeRateInfoError } = useGetTicker('USDEUR=X')
  const { state: initialTickersInfoState, data: initialTickersInfoData, error: initialTickersInfoError } = useGetAllTickers(tickers)
  const { state: updatedTickersInfoState, data: updatedTickersInfoData } = useYFWebSocket(userTickersData)

  const [stocksInfo, setStocksInfo] = useState<Request>({ state: 'pending', data: {} })
  const { state: stocksInfoState, data: stocksInfoData, error: stocksInfoError } = stocksInfo

  const [total, setTotal] = useState<number>(0)
  const [listState, setListState] = useState<string>('pending')

  useEffect(() => {
    setTickers({ state: userTickersState, data: _.keys(userTickersData), error: userTickersError })
  }, [userTickersState])

  useEffect(() => {
    if (initialTickersInfoState === 'pending') return

    if (initialTickersInfoState === 'error') {
      setStocksInfo({ state: 'error', error: initialTickersInfoError })
      return
    }

    setStocksInfo({ state: 'success', data: initialTickersInfoData })
  }, [initialTickersInfoState])

  useEffect(() => {
    setTotal(
      toFixed(
        _.reduce(stocksInfoData, (total: number, stock: any) => total + stock.price * userTickersData[stock.id].quantity, 0),
        2
      )
    )
  }, [stocksInfoData])

  useEffect(() => {
    if (stocksInfoState === 'success') {
      _.map(updatedTickersInfoData, (updatedStock: any) => {
        const ticker: string = findKey(updatedTickersInfoData, updatedStock)!
        if (!stocksInfoData[ticker as keyof object]) return

        setStocksInfo(prevStocksInfo => ({ state: prevStocksInfo.state, data: { ...prevStocksInfo.data, [ticker]: updatedStock } }))
      })
    }
  }, [updatedTickersInfoData])

  useEffect(() => {
    if (exchangeRateInfoState === 'error' || stocksInfoState === 'error') {
      setListState('error')
      return
    }

    if (exchangeRateInfoState === 'success' && stocksInfoState === 'success') setListState('success')
  }, [exchangeRateInfoState, stocksInfoState])

  return <InvestmentsContext.Provider value={{ listState, initialTickersInfoError, stocksInfoError, stocksInfoData, userTickersData, exchangeRateInfoData, total }}>{children}</InvestmentsContext.Provider>
}

export const useInvestmentsContext = () => {
  return useContext(InvestmentsContext)
}
