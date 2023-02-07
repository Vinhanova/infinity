import { useDocFirestore } from '../../utils/useGetFirestore'
import { useGetAllStocks as useGetAllStocks } from '../../utils/useGetAllTickers'
import { useYFWebSocket } from '../../utils/useYFWebSocket'
import { UserAuth } from '../../Context/AuthContext'
import { FC, useEffect, useState } from 'react'
import { userStockDic } from '../../utils/types'
import _ from 'underscore'

const InvestmentsPage: FC = () => {
  const { user } = UserAuth()
  const [total, setTotal] = useState<number>(0)
  const [total2, setTotal2] = useState<number>(0)
  const [tickers, setTickers] = useState<string[]>([])

  const { state, data: userStocks, error } = useDocFirestore<userStockDic>(`stocks`, user.uid)
  const initialStockInfo = useGetAllStocks(tickers)

  const stocks = useYFWebSocket(userStocks)

  useEffect(() => {
    setTickers(_.keys(userStocks))
  }, [userStocks])

  useEffect(() => {
    setTotal(
      toFixed(
        _.reduce(stocks, (total: number, stock: any) => total + stock.price * userStocks![stock.id].quantity, 0),
        2
      )
    )
    setTotal2(
      toFixed(
        _.reduce(initialStockInfo.data, (total: number, stock: any) => total + stock.c * userStocks[stock.id].quantity, 0),
        2
      )
      // static array
      // does not update with new info (stocks)
    )
  }, [stocks, initialStockInfo])

  useEffect(() => {
    console.log('initialTickerInfo', initialStockInfo)
  }, [initialStockInfo])

  function toFixed(num: number, fixed: number): number {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
    return +num?.toString()?.match(re)! ? +num?.toString()?.match(re)![0] : 0
  }

  return (
    <>
      <div className='flex w-full items-center space-x-3'>
        <div className='mt-8 w-3/4'>
          <div>
            {state === 'pending' && <h1>Pending</h1>}
            {state === 'error' && <h1>{error.toString()}</h1>}
            {state === 'success' && _.isEmpty(stocks) ? (
              <h1 className='p-2'>No stocks found</h1>
            ) : (
              _.map(stocks, (stock: any) => {
                if (userStocks[stock.id].quantity === 0) return

                return (
                  <div key={stock.id} className='w-full border-t-2 p-2'>
                    <div className='flex justify-between'>
                      <p className='font-medium'>{userStocks![stock.id].name + ' (' + stock.id + ')'}:</p>
                      <p className={stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>
                        {toFixed(stock.price, stock.price < 1 ? 3 : 2)} ({toFixed(stock.changePercent, 2)}%)
                      </p>
                    </div>
                    <p className='text-right'>{toFixed(stock.price * userStocks![stock.id].quantity, 2)} $</p>
                  </div>
                )
              })
            )}
          </div>
          <div className='flex justify-between border-t-2 p-2'>
            <h1>Total: </h1>
            <div className='text-right'>
              <h1>{total} $</h1>
              <h1>{toFixed(total * 0.92, 2)} €</h1>
            </div>
          </div>
        </div>
        <div className='mt-8 w-3/4'>
          <div>
            {initialStockInfo.state === 'pending' && <h1>Pending</h1>}
            {initialStockInfo.state === 'error' && <h1>{error}</h1>}
            {initialStockInfo.state === 'success' && _.isEmpty(stocks) ? (
              <h1 className='p-2'>No stocks found</h1>
            ) : (
              initialStockInfo.data?.map((initialStock: any) => {
                if (userStocks[initialStock.id].quantity === 0) return
                //stocks?[initialStock.id] ? stocks[initialStock.id].price :
                return (
                  <div key={initialStock.id} className='w-full border-t-2 p-2'>
                    <div className='flex justify-between'>
                      <p className='font-medium'>{userStocks![initialStock.id].name + ' (' + initialStock.id + ')'}:</p>
                      <p className={initialStock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>
                        {stocks[initialStock.id] ? toFixed(stocks[initialStock.id].price, stocks[initialStock.id].price < 1 ? 3 : 2) : toFixed(initialStock.c, initialStock.c < 1 ? 3 : 2)} ({toFixed(initialStock.changePercent, 2)}%)
                      </p>
                    </div>
                    <p className='text-right'>{toFixed(initialStock.price * userStocks![initialStock.id].quantity, 2)} $</p>
                  </div>
                )
              })
            )}
          </div>
          <div className='flex justify-between border-t-2 p-2'>
            <h1>Total: </h1>
            <div className='text-right'>
              <h1>{total2} $</h1>
              <h1>{toFixed(total2 * 0.92, 2)} €</h1>
            </div>
          </div>
        </div>

        {/* <div className='mt-8 w-3/4'>
          <div>
            {state === 'pending' && <h1>Pending</h1>}
            {state === 'error' && <h1>{error.toString()}</h1>}
            {state === 'success' && _.isEmpty(stocks) ? (
              <h1 className='p-2'>No stocks found</h1>
            ) : (
              _.map(newStocks, (stock: any) => {
                return (
                  <div key={stock.s} className='w-full border-t-2 p-2'>
                    <div className='flex justify-between'>
                      <p className='font-medium'>{stock.s}:</p>
                      <p className={stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>{toFixed(stock.p, stock.p < 1 ? 3 : 2)}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div> */}
      </div>
    </>
  )
}

export default InvestmentsPage
