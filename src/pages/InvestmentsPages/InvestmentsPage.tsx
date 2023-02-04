import { useDocFirestore } from '../../utils/useGetFirestore'
import { UserAuth } from '../../Context/AuthContext'
import { userStocks } from '../../utils/types'
import { FC, useEffect, useState } from 'react'
import protobuf from 'protobufjs'
import { Buffer } from 'buffer'
import _ from 'underscore'

const InvestmentsPage: FC = () => {
  const { user } = UserAuth()
  const { state, data: userStocks, error } = useDocFirestore<userStocks>(`stocks`, user.uid)
  const [stocks, setStocks] = useState<{}>({})

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
          console.log(stockInfo)
          setStocks(stocks => ({ ...stocks, [stockInfo.id]: stockInfo }))
        }

        ws.onclose = function close() {
          console.log('disconnected')
        }
      })
    }
  }, [userStocks])

  return (
    <>
      <div className='flex w-full flex-col items-center'>
        <div className='mt-8 w-3/4'>
          {state === 'pending' && <h1>Pending</h1>}
          {state === 'error' && <h1>{error.toString()}</h1>}
          {state === 'success' &&
            _.map(stocks, (stock: any) => (
              <div key={stock.id} className='mb-5 w-full border-2'>
                <p>{userStocks![stock.id].name + ' (' + stock.id + ')'}:</p>
                <div className='flex justify-between'>
                  <p className={stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>
                    {stock.price.toFixed('2')} ({stock.changePercent.toFixed(2)}%)
                  </p>
                  <p className='mr-2'>{(stock.price * userStocks![stock.id].quantity).toFixed(2)} $</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default InvestmentsPage
