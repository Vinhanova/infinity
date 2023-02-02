import { FC, useEffect, useState } from 'react'
import protobuf from 'protobufjs'
import { Buffer } from 'buffer'
import _ from 'underscore'

type userStocks = {
  [ticker: string]: {
    name: string
    quantity: number
  }
}

const InvestmentsPage: FC = () => {
  const [stocks, setStocks] = useState<{}>({})
  const [userStocks, setUserStocks] = useState<userStocks>({
    '^GSPC': { name: 'S&P 500', quantity: 0 },
    '^IXIC': { name: 'NASDAQ', quantity: 213 },
    '^DJI': { name: 'DOW 30', quantity: 123 },
    TSLA: { name: 'TESLA', quantity: 12 },
    AAPL: { name: 'APPLE', quantity: 321 },
    'BTC-USD': { name: 'BITCOIN', quantity: 3 },
    'ETH-USD': { name: 'ETHEREUM', quantity: 21 },
    'DOGE-USD': { name: 'DOGE', quantity: 3124 }
  })

  useEffect(() => {
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

      ws.onclose = function close() {
        console.log('disconnected')
      }

      ws.onmessage = function incoming(message) {
        const stockInfo: any = Yaticker.decode(new Buffer(message.data, 'base64'))
        console.log(stockInfo)
        setStocks(stocks => ({ ...stocks, [stockInfo.id]: stockInfo }))
      }
    })
  }, [])

  return (
    <>
      <div className='flex w-full flex-col items-center'>
        <div className='mt-8 w-3/4'>
          {_.map(stocks, (stock: any) => (
            <div key={stock.id} className='mb-5 w-full border-2'>
              <p>{userStocks[stock.id].name + ' (' + stock.id + ')'}:</p>
              <div className='flex justify-between'>
                <p className={stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>
                  {stock.price.toFixed('2')} ({stock.changePercent.toFixed(2)}%)
                </p>
                <p className='mr-2'>{(stock.price * userStocks[stock.id].quantity).toFixed(2)} $</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default InvestmentsPage
