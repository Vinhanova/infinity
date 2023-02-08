import { useDocFirestore } from '../../utils/useGetFirestore'
import { useGetAllStocks } from '../../utils/useGetAllTickers'
import { useYFWebSocket } from '../../utils/useYFWebSocket'
import { Request, userStockDic } from '../../utils/types'
import { UserAuth } from '../../Context/AuthContext'
import { FC, useEffect, useState } from 'react'
import _ from 'underscore'

const InvestmentsPage: FC = () => {
  const { user } = UserAuth()
  const [tickers, setTickers] = useState<string[]>([])

  const { state: userStocksState, data: userStocksData, error: userStocksError } = useDocFirestore<userStockDic>(`stocks`, user.uid)
  const { state: initialStocksInfoState, data: initialStocksInfoData, error: initialStocksInfoError } = useGetAllStocks(tickers)
  const { state: updatedStocksInfoState, data: updatedStocksInfoData } = useYFWebSocket(userStocksData)

  const [stocksInfo, setStocksInfo] = useState<Request>({ state: 'pending', data: {} })
  const { state: stocksInfoState, data: stocksInfoData } = stocksInfo

  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    setTickers(_.keys(userStocksData))
  }, [userStocksData])

  useEffect(() => {
    if (initialStocksInfoState === 'pending') return

    if (initialStocksInfoState === 'error') {
      setStocksInfo({ state: 'error', error: '"initialStocksInfo" Error' })
      return
    }

    setStocksInfo({ state: 'success', data: initialStocksInfoData })
  }, [initialStocksInfoState])

  useEffect(() => {
    setTotal(
      toFixed(
        _.reduce(stocksInfoData, (total: number, stock: any) => total + stock.price * userStocksData[stock.id].quantity, 0),
        2
      )
    )
  }, [stocksInfoData])

  useEffect(() => {
    if (stocksInfoState === 'success') {
      _.map(updatedStocksInfoData, (updatedStock: any) => {
        const ticker: string = findKey(updatedStocksInfoData, updatedStock)
        if (!stocksInfoData[ticker as keyof object]) return

        setStocksInfo(prevStocksInfo => ({ state: prevStocksInfo.state, data: { ...prevStocksInfo.data, [ticker]: updatedStock } }))
      })
    }
  }, [updatedStocksInfoData])

  function toFixed(num: number, fixed: number): number {
    if (!num) return 0

    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
    return +num?.toString()?.match(re)![0]
  }

  function findKey(obj: any, value: any): string {
    return Object.keys(obj).find(key => obj[key] === value)!
  }

  return (
    <>
      <div className='flex w-full flex-col items-center space-x-3'>
        <div className='mt-8 w-3/4 text-center'>
          {stocksInfoState === 'pending' && <h1 className='mb-8'>Loading...</h1>}

          {initialStocksInfoError?.response?.status === 429 && <h1 className='mb-8 text-red-500'>Warning: Slow Down (429)</h1>}

          {stocksInfoState === 'success' &&
            (_.isEmpty(stocksInfoData) ? (
              <h1 className='p-2'>No stocks found</h1>
            ) : (
              <>
                <div>
                  {_.map(stocksInfoData, (stock: any) => {
                    if (userStocksData[stock.id].quantity === 0) return
                    return (
                      <div key={stock.id} className='w-full border-t-2 p-2'>
                        <div className='flex justify-between'>
                          <p className='font-medium'>{userStocksData![stock.id].name + ' (' + stock.id + ')'}:</p>
                          <p className={stock.changePercent === null ? '' : stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>
                            {toFixed(stock.price, stock.price < 1 ? 3 : 2)} ({toFixed(stock.changePercent, 2)}%)
                          </p>
                        </div>
                        <p className='text-right'>{toFixed(stock.price * userStocksData![stock.id].quantity, 2)} $</p>
                      </div>
                    )
                  })}
                </div>
                <div className='flex justify-between border-t-2 p-2'>
                  <h1>Total: </h1>
                  <div className='text-right'>
                    <h1>{total} $</h1>
                    <h1>{toFixed(total * 0.93, 2)} €</h1>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  )
}

export default InvestmentsPage
