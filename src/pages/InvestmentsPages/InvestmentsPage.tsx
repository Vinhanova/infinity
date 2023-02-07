import { useDocFirestore } from '../../utils/useGetFirestore'
import { useGetAllTickers } from '../../utils/useGetAllTickers'
import { useYFWebSocket } from '../../utils/useYFWebSocket'
import { useFHWebSocket } from '../../utils/useFHWebSocket'
import { UserAuth } from '../../Context/AuthContext'
import { FC, useEffect, useState } from 'react'
import { userStocks } from '../../utils/types'
import _ from 'underscore'

const InvestmentsPage: FC = () => {
  const { user } = UserAuth()
  const [total, setTotal] = useState<number>(0)
  const [tickers, setTickers] = useState<string[]>([])

  const { state, data: userStocks, error } = useDocFirestore<userStocks>(`stocks`, user.uid)
  const initialTickerInfo = useGetAllTickers(tickers)

  const stocks = useYFWebSocket(userStocks)
  const newStocks = useFHWebSocket(userStocks)

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
  }, [stocks])

  useEffect(() => {
    console.log('initialTickerInfo', initialTickerInfo)
  }, [initialTickerInfo])

  function toFixed(num: number, fixed: number): number {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
    return +num.toString().match(re)![0]
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
        </div>
      </div>
    </>
  )
}

export default InvestmentsPage
