import { useGetAllTickers, useGetTicker } from '../../utils/useGetTickers'
import { useDocFirestore } from '../../utils/useGetFirestore'
import { useYFWebSocket } from '../../utils/useYFWebSocket'
import { Request, userStockDic } from '../../utils/types'
import { UserAuth } from '../../Context/AuthContext'
import { FC, useEffect, useState } from 'react'
import _ from 'underscore'
import { Link } from 'react-router-dom'

const InvestmentsPage: FC = () => {
  const { user } = UserAuth()
  const [tickers, setTickers] = useState<Request>({ state: 'pending' })

  const { state: userTickersState, data: userTickersData, error: userTickersError } = useDocFirestore<userStockDic>(`stocks`, user.uid)
  const { state: USDEURInfoState, data: USDEURInfoData, error: USDEURInfoError } = useGetTicker('USDEUR=X')
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
        const ticker: string = findKey(updatedTickersInfoData, updatedStock)
        if (!stocksInfoData[ticker as keyof object]) return

        setStocksInfo(prevStocksInfo => ({ state: prevStocksInfo.state, data: { ...prevStocksInfo.data, [ticker]: updatedStock } }))
      })
    }
  }, [updatedTickersInfoData])

  useEffect(() => {
    if (USDEURInfoState === 'error' || stocksInfoState === 'error') {
      setListState('error')
      return
    }

    if (USDEURInfoState === 'success' && stocksInfoState === 'success') setListState('success')
  }, [USDEURInfoState, stocksInfoState])

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
      <div className='flex flex-col items-center space-x-3'>
        <div className='mt-4 mb-2 w-11/12 text-center sm:mt-8 sm:mb-6 sm:w-3/4'>
          {listState === 'pending' && <h1 className='mb-8'>Loading...</h1>}

          {listState === 'error' &&
            ((initialTickersInfoError?.response?.status === 429 && <h1 className='mb-8 text-red-500'>Warning: Slow Down (429)</h1>) ||
              (stocksInfoError === 'No tickers found' && (
                <div className='mb-8'>
                  <h3>
                    0 assets found, you can add a new asset{' '}
                    <Link to='/investments/new-asset' className='underline'>
                      here
                    </Link>
                    .
                  </h3>
                </div>
              )))}

          {listState === 'success' &&
            (_.isEmpty(stocksInfoData) ? (
              <h1 className='p-2'>No stocks found</h1>
            ) : (
              <>
                <div>
                  {_.map(stocksInfoData, (stock: any) => {
                    if (userTickersData[stock.id].quantity === 0) return
                    return (
                      <div key={stock.id} className='w-full border-t-2 p-2'>
                        <div className='flex justify-between'>
                          <p className='font-medium'>
                            {userTickersData![stock.id].name}
                            <span className='ml-1 hidden sm:inline-block'>{`(${stock.id})`}</span>:
                          </p>
                          <p className={stock.changePercent === null ? '' : stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>
                            {toFixed(stock.price, stock.price < 1 ? 3 : 2)} ({toFixed(stock.changePercent, 2)}%)
                          </p>
                        </div>
                        <p className='text-right'>{toFixed(stock.price * userTickersData![stock.id].quantity, 2)} $</p>
                      </div>
                    )
                  })}
                </div>
                <div className='flex justify-between border-t-2 p-2'>
                  <div className='text-left'>
                    <h1>Total: </h1>
                    <h1>(USD/EUR: {USDEURInfoData?.c.toFixed(3)})</h1>
                  </div>
                  <div className='text-right'>
                    <h1>{total} $</h1>
                    <h1>{toFixed(total * USDEURInfoData?.c, 2)} €</h1>
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
