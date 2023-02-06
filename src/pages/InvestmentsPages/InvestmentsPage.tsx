import { useDocFirestore } from '../../utils/useGetFirestore'
import { useGetAllTickers } from '../../utils/useGetAllTickers'
import { UserAuth } from '../../Context/AuthContext'
import { FC, useEffect, useState } from 'react'
import { userStocks } from '../../utils/types'
import protobuf from 'protobufjs'
import { Buffer } from 'buffer'
import _ from 'underscore'

const InvestmentsPage: FC = () => {
  const { user } = UserAuth()
  const [stocks, setStocks] = useState<{}>({})
  const [newStocks, setNewStocks] = useState<any>({})
  const [total, setTotal] = useState<number>(0)
  const [tickers, setTickers] = useState<string[]>([])

  const { state, data: userStocks, error } = useDocFirestore<userStocks>(`stocks`, user.uid)
  const initialTickerInfo = useGetAllTickers({ tickers })

  useEffect(() => {
    console.log('initialTickerInfo', initialTickerInfo)
  }, [initialTickerInfo])

  useEffect(() => {
    setTickers(_.keys(userStocks))
  }, [userStocks])

  useEffect(() => {
    if (userStocks) {
      const ws = new WebSocket('wss://streamer.finance.yahoo.com')

      protobuf.load('./YPricingData.proto', (error, root) => {
        if (error) {
          return console.log(error)
        }

        const Yaticker = root!.lookupType('yaticker')

        ws.onopen = function open() {
          console.log('connected')
          ws.send(
            JSON.stringify({
              subscribe: _.keys(userStocks)
            })
          )
        }

        ws.onmessage = function incoming(message) {
          const stockInfo: any = Yaticker.decode(new Buffer(message.data, 'base64'))
          //console.log('>>>>> ', stockInfo.id, +stockInfo.price.toFixed(2))
          setStocks(stocks => ({ ...stocks, [stockInfo.id]: stockInfo }))
        }

        ws.onclose = function close() {
          console.log('disconnected')
        }
        //onLeavingPage => ws.close?
      })

      const socket = new WebSocket('wss://ws.finnhub.io?token=cfgimjpr01qlga2uev4gcfgimjpr01qlga2uev50')

      // Connection opened -> Subscribe
      socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({ type: 'subscribe', symbol: 'TSLA' }))
        socket.send(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }))
        socket.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' }))
        socket.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:ETHUSDT' }))
        socket.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:DOGEUSDT' }))
        socket.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:ADAUSDT' }))
        socket.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:SOLUSDT' }))
        socket.send(JSON.stringify({ type: 'subscribe', symbol: '^DJI' }))
        socket.send(JSON.stringify({ type: 'subscribe', symbol: '^GSPC' }))
        socket.send(JSON.stringify({ type: 'subscribe', symbol: '^IXIC' }))
      })

      // Listen for messages
      socket.addEventListener('message', function (event) {
        const data = JSON.parse(event.data)?.data[0]
        //console.log('----- ', data.s, data)
        setNewStocks((newStocks: any) => ({ ...newStocks, [data.s]: data }))
      })

      // Unsubscribe
      var unsubscribe = function (symbol: string) {
        socket.send(JSON.stringify({ type: 'unsubscribe', symbol: symbol }))
      }
    }
  }, [userStocks])

  useEffect(() => {
    setTotal(+_.reduce(stocks, (total: number, stock: any) => total + stock.price * userStocks![stock.id].quantity, 0).toFixed(2))
  }, [stocks])

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
                        {stock.price.toFixed('2')} ({stock.changePercent.toFixed(2)}%)
                      </p>
                    </div>
                    <p className='text-right'>{(stock.price * userStocks![stock.id].quantity).toFixed(2)} $</p>
                  </div>
                )
              })
            )}
          </div>
          <div className='flex justify-between border-t-2 p-2'>
            <h1>Total: </h1>
            <div className='text-right'>
              <h1>{total} $</h1>
              <h1>{(total * 0.92).toFixed(2)} €</h1>
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
                      <p className={stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>{stock.p.toFixed(2)}</p>
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
