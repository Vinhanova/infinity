import { useDocFirestore } from '../../utils/useGetFirestore'
import { useGetAllStocks } from '../../utils/useGetAllTickers'
import { useYFWebSocket } from '../../utils/useYFWebSocket'
import { UserAuth } from '../../Context/AuthContext'
import { FC, useEffect, useState } from 'react'
import { Request, userStockDic } from '../../utils/types'
import _ from 'underscore'

const InvestmentsPage: FC = () => {
  const { user } = UserAuth()
  const [total, setTotal] = useState<number>(0)
  const [total2, setTotal2] = useState<number>(0)
  const [tickers, setTickers] = useState<string[]>([])

  const { state: userStocksState, data: userStocksData, error: userStocksError } = useDocFirestore<userStockDic>(`stocks`, user.uid)

  const { state: initialStocksInfoState, data: initialStocksInfoData, error: initialStocksInfoError } = useGetAllStocks(tickers)
  const { state: updatedStocksInfoState, data: updatedStocksInfoData } = useYFWebSocket(userStocksData)

  const [stocksInfo, setStocksInfo] = useState<Request>({ state: 'pending' })

  useEffect(() => {
    if (_.isEmpty(initialStocksInfoData)) return

    setStocksInfo({ state: 'success', data: initialStocksInfoData })
  }, [initialStocksInfoData])

  useEffect(() => {
    setTickers(_.keys(userStocksData))
  }, [userStocksData])

  useEffect(() => {
    /* setTotal(
      toFixed(
        _.reduce(updatedStocksInfo, (total: number, stock: any) => total + stock.price * userStocksData![stock.id].quantity, 0),
        2
      )
    ) */
    setTotal(
      toFixed(
        _.reduce(stocksInfo.data, (total: number, stock: any) => total + stock.price * userStocksData[stock.id].quantity, 0),
        2
      )
      // static array
      // does not update with new info (stocks)
    )
  }, [stocksInfo.data])

  useEffect(() => {
    if (stocksInfo.state === 'success') {
      _.map(updatedStocksInfoData, (updatedStock: any) => {
        //const stockIndex = initialStocksInfoData.findIndex((initialStock: any) => initialStock.id === updatedStock.id)
        const ticker: string = findKey(updatedStocksInfoData, updatedStock)
        if (stocksInfo.data[ticker as keyof object]) {
          setStocksInfo(prevStocksInfo => ({ state: prevStocksInfo.state, data: { ...prevStocksInfo.data, [ticker]: updatedStock } }))

          /* let stocksInfoAux: object[] = [...stocksInfo]
          // 2. Make a shallow copy of the item you want to mutate
          let stockAux: {} = stocksInfoAux[stockIndex]
          // 3. Replace the property you're intested in
          stockAux = updatedStock
          // 4. Put it back into our array. N.B. we *are* mutating the array here,
          //    but that's why we made a copy first
          stocksInfoAux[stockIndex] = stockAux
          console.log(stocksInfoAux)
          setStocksInfo(() => [...stocksInfoAux]) */
          //updatedStocksInfo[updatedStock]
        } else {
          //updatedStock
          return
        }
      })
    }
  }, [updatedStocksInfoData])

  useEffect(() => {
    console.log('initialStocksInfoData', initialStocksInfoData)
  }, [initialStocksInfoState])

  useEffect(() => {
    console.log('userStocksData', userStocksData)
  }, [userStocksData])

  useEffect(() => {
    console.log('updatedStocksInfoData', updatedStocksInfoData)
  }, [updatedStocksInfoData])

  useEffect(() => {
    console.log('stocksInfo', stocksInfo.state, stocksInfo.data)
  }, [stocksInfo])

  function toFixed(num: number, fixed: number): number {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
    return +num?.toString()?.match(re)! ? +num?.toString()?.match(re)![0] : 0
  }

  function findKey(obj: any, value: any): string {
    return Object.keys(obj).find(key => obj[key] === value)!
  }

  return (
    <>
      <div className='flex w-full flex-col items-center space-x-3'>
        <div className='mt-8 w-3/4'>
          <div>
            {initialStocksInfoState === 'pending' && <h1>Pending</h1>}
            {initialStocksInfoState === 'error' && <h1>{userStocksError}</h1>}
            {stocksInfo.state === 'success' ? (
              _.map(stocksInfo.data, (stock: any) => {
                if (userStocksData[stock.id].quantity === 0) return
                //stocks?[initialStock.id] ? stocks[initialStock.id].price :
                return (
                  <div key={stock.id} className='w-full border-t-2 p-2'>
                    <div className='flex justify-between'>
                      <p className='font-medium'>{userStocksData![stock.id].name + ' (' + stock.id + ')'}:</p>
                      <p className={stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>
                        {toFixed(stock.price, stock.price < 1 ? 3 : 2)} ({toFixed(stock.changePercent, 2)}%)
                      </p>
                    </div>
                    <p className='text-right'>{toFixed(stock.price * userStocksData![stock.id].quantity, 2)} $</p>
                  </div>
                )
              })
            ) : (
              <h1 className='p-2'>No stocks found</h1>
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
      </div>
    </>
  )
}

export default InvestmentsPage
