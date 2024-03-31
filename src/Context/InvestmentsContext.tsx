import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { useGetAllTickers, useGetTicker } from '../utils/useGetTickers'
import { useDocFirestore } from '../utils/useGetFirestore'
import { useYFWebSocket } from '../utils/useYFWebSocket'
import { Request, AssetDic } from '../utils/types'
import { findKey, toFixed } from '../utils/utils'
import { useUserAuth } from './AuthContext'
import _ from 'underscore'

type Props = {
  children: ReactNode
}

const InvestmentsContext = createContext<any>({})

export const InvestmentsContextProvider: FC<Props> = ({ children }) => {
  const { user } = useUserAuth()
  const [tickers, setTickers] = useState<Request>({ state: 'pending' })

  const { state: userTickersState, data: userTickersData, error: userTickersError } = useDocFirestore<AssetDic>(`stocks`, user.uid) // can't change to "assets"
  const { state: exchangeRateInfoState, data: exchangeRateInfoData, error: exchangeRateInfoError } = useGetTicker('USDEUR=X')
  const { state: initialTickersInfoState, data: initialTickersInfoData, error: initialTickersInfoError } = useGetAllTickers(tickers)
  const { state: updatedTickersInfoState, data: updatedTickersInfoData } = useYFWebSocket(userTickersData)

  const [stocksInfo, setStocksInfo] = useState<Request>({ state: 'pending', data: {} })
  const { state: stocksInfoState, data: stocksInfoData, error: stocksInfoError } = stocksInfo

  const [totalUSD, setTotalUSD] = useState<number>(0)
  const [totalEUR, setTotalEUR] = useState<number>(0)
  const [totalStocks, setTotalStocks] = useState<number>(0)
  const [totalCryptocurrencies, setTotalCryptocurrencies] = useState<number>(0)
  const [listState, setListState] = useState<string>('pending')
  const [purchasedAssetsList, setPurchasedAssetsList] = useState<any>({})
  const [watchlistAssetsList, setWatchlistAssetsList] = useState<any>({})
  const [stocksList, setStocksList] = useState<any>({})
  const [cryptoList, setCryptoList] = useState<any>({})

  const [editAssetModal, setEditAssetModal] = useState<boolean>(false)
  const [assetInfo, setAssetInfo] = useState<any>({})

  function openEditAssetModal(assetId: string) {
    setAssetInfo(userTickersData[assetId])
    setEditAssetModal(true)
  }

  function closeEditAssetModal() {
    setEditAssetModal(false)
  }

  useEffect(() => {
    setTickers({ state: userTickersState, data: userTickersData, error: userTickersError })
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
    setTotalUSD(_.reduce(purchasedAssetsList, (total: number, asset: any) => total + asset.price * userTickersData[asset.id].quantity, 0))
  }, [purchasedAssetsList])

  useEffect(() => setTotalEUR(toFixed(totalUSD * exchangeRateInfoData?.c, 2)), [totalUSD, exchangeRateInfoData])

  useEffect(() => {
    setTotalStocks(toFixed(_.reduce(stocksList, (total: number, asset: any) => total + asset.price * userTickersData[asset.id].quantity, 0) * exchangeRateInfoData?.c, 2))
  }, [stocksList, exchangeRateInfoData])

  useEffect(() => {
    setTotalCryptocurrencies(toFixed(_.reduce(cryptoList, (total: number, asset: any) => total + asset.price * userTickersData[asset.id].quantity, 0) * exchangeRateInfoData?.c, 2))
  }, [cryptoList, exchangeRateInfoData])

  useEffect(() => {
    if (stocksInfoState === 'success') {
      _.map(updatedTickersInfoData, (updatedStock: any) => {
        const ticker: string = findKey(updatedTickersInfoData, updatedStock)!
        if (!stocksInfoData[ticker as keyof object]) return

        setStocksInfo(prevStocksInfo => ({ state: prevStocksInfo.state, data: { ...prevStocksInfo.data, [ticker]: { ...prevStocksInfo.data[ticker], ...updatedStock } } }))
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

  useEffect(() => {
    if (_.isEmpty(stocksInfoData)) return

    _.map(stocksInfoData, (asset: any) => {
      if (asset.state === 'purchased') {
        setPurchasedAssetsList((prev: any) => ({ ...prev, [asset.id]: asset }))

        switch (asset.type) {
          case 'stock':
            setStocksList((prev: any) => ({ ...prev, [asset.id]: asset }))
            break
          case 'cryptocurrency':
            setCryptoList((prev: any) => ({ ...prev, [asset.id]: asset }))
            break
          default:
            console.log('Asset Type Error')
        }
      } else setWatchlistAssetsList((prev: any) => ({ ...prev, [asset.id]: asset }))
    })
  }, [stocksInfoData])

  return <InvestmentsContext.Provider value={{ stocksList, cryptoList, watchlistAssetsList, purchasedAssetsList, listState, initialTickersInfoError, stocksInfoError, stocksInfoData, userTickersData, exchangeRateInfoData, totalStocks, totalCryptocurrencies, totalUSD, totalEUR, editAssetModal, openEditAssetModal, closeEditAssetModal, oldAssetInfo: assetInfo }}>{children}</InvestmentsContext.Provider>
}

export const useInvestmentsContext = () => {
  return useContext(InvestmentsContext)
}
