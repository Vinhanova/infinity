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

  const initialStocksInfo = useGetAllStocks(tickers)
  const updatedStocksInfo = useYFWebSocket(userStocks)
  const [stocksInfo, setStocksInfo] = useState<object[]>([])

  useEffect(() => {
    if (stocksInfo.length) return

    setStocksInfo(initialStocksInfo.data)
  }, [initialStocksInfo])

  useEffect(() => {
    setTickers(_.keys(userStocks))
  }, [userStocks])

  useEffect(() => {
    setTotal(
      toFixed(
        _.reduce(updatedStocksInfo, (total: number, stock: any) => total + stock.price * userStocks![stock.id].quantity, 0),
        2
      )
    )
    setTotal2(
      toFixed(
        _.reduce(stocksInfo, (total: number, stock: any) => total + stock.price * userStocks[stock.id].quantity, 0),
        2
      )
      // static array
      // does not update with new info (stocks)
    )
  }, [updatedStocksInfo, initialStocksInfo])

  /* useEffect(() => {
    if (updatedStocksInfo.length === 0) return
    _.map(updatedStocksInfo, (updatedStock: any) => {
      const stockIndex = initialStocksInfo.data.findIndex((initialStock: any) => initialStock.id === updatedStock.id)

      if (stockIndex !== -1) {
        let stocksInfoAux: object[] = [...stocksInfo]
        // 2. Make a shallow copy of the item you want to mutate
        let stockAux: {} = stocksInfoAux[stockIndex]
        // 3. Replace the property you're intested in
        stockAux = updatedStock
        // 4. Put it back into our array. N.B. we *are* mutating the array here,
        //    but that's why we made a copy first
        stocksInfoAux[stockIndex] = stockAux
        console.log(stocksInfoAux)
        setStocksInfo(() => [...stocksInfoAux])
        //updatedStocksInfo[updatedStock]
      } else {
        //updatedStock
        return
      }
    })
  }, [updatedStocksInfo]) */

  /* useEffect(() => {
    console.log('initialStocksInfo', initialStocksInfo)
  }, [initialStocksInfo]) */

  useEffect(() => {
    console.log('userStocks', userStocks)
  }, [userStocks])

  /* useEffect(() => {
    console.log('updatedStocksInfo', updatedStocksInfo)
  }, [updatedStocksInfo]) */

  /* useEffect(() => {
    console.log('stocksInfo', stocksInfo)
  }, [stocksInfo]) */

  function toFixed(num: number, fixed: number): number {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
    return +num?.toString()?.match(re)! ? +num?.toString()?.match(re)![0] : 0
  }

  function findKey(obj: any, value: any): string {
    return Object.keys(obj).find(key => obj[key] === value)!
  }

  return (
    <>
      <div className='flex w-full items-center space-x-3'>
        <div className='mt-8 w-3/4'>
          <div>
            {state === 'pending' && <h1>Pending</h1>}
            {state === 'error' && <h1>{error.toString()}</h1>}
            {state === 'success' && _.isEmpty(updatedStocksInfo) ? (
              <h1 className='p-2'>No stocks found</h1>
            ) : (
              _.map(updatedStocksInfo, (stock: any) => {
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
            {initialStocksInfo.state === 'pending' && <h1>Pending</h1>}
            {initialStocksInfo.state === 'error' && <h1>{error}</h1>}
            {initialStocksInfo.state === 'success' && _.isEmpty(updatedStocksInfo) ? (
              <h1 className='p-2'>No stocks found</h1>
            ) : (
              state === 'success' &&
              _.map(userStocks, (userStock: any) => {
                if (userStock.quantity === 0) return

                const keyAux = findKey(userStocks, userStock)
                const initialStockAux = _.find(initialStocksInfo.data, s => s.id === keyAux)
                const updatedStockAux = _.find(updatedStocksInfo, s => s.id === keyAux)

                return (
                  <div key={keyAux} className='w-full border-t-2 p-2'>
                    <div className='flex justify-between'>
                      <p className='font-medium'>{userStock.name + ' (' + keyAux + ')'}:</p>
                      <p className={updatedStockAux ? (updatedStockAux.changePercent > 0 ? 'text-green-500' : 'text-red-500') : 'text-white'}>
                        {toFixed(updatedStockAux!?.price, updatedStockAux!?.price < 1 ? 3 : 2) || toFixed(initialStockAux?.price, initialStockAux?.price < 1 ? 3 : 2)} ({toFixed(updatedStockAux!?.changePercent, 2)}%)
                      </p>
                    </div>
                    <p className='text-right'>{initialStockAux ? toFixed(initialStockAux.price * userStock.quantity, 2) : '?'} $</p>
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
        <div className='mt-8 w-3/4'>
          <div>
            {initialStocksInfo.state === 'pending' && <h1>Pending</h1>}
            {initialStocksInfo.state === 'error' && <h1>{error}</h1>}
            {initialStocksInfo.state === 'success' && _.isEmpty(updatedStocksInfo) ? (
              <h1 className='p-2'>No stocks found</h1>
            ) : (
              stocksInfo?.map((stock: any) => {
                if (userStocks[stock.id].quantity === 0) return
                //stocks?[initialStock.id] ? stocks[initialStock.id].price :
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
