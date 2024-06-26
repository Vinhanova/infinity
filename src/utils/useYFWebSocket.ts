import { useEffect, useState } from 'react'
import protobuf from 'protobufjs'
import { Buffer } from 'buffer'
import { Request } from './types'

import _ from 'underscore'

export const useYFWebSocket = (userStocks: any) => {
  const [stocks, setStocks] = useState<Request>({ state: 'pending' })

  useEffect(() => {
    if (userStocks) {
      const ws = new WebSocket('wss://streamer.finance.yahoo.com')

      protobuf.load('../YPricingData.proto', (error, root) => {
        if (error) {
          return console.log(error)
        }

        const Yaticker = root!.lookupType('yaticker')

        ws.onopen = function open() {
          setStocks({ state: 'connected' })
          ws.send(
            JSON.stringify({
              subscribe: _.keys(userStocks)
            })
          )
        }

        ws.onmessage = function incoming(message) {
          const stockInfo: any = Yaticker.decode(new Buffer(message.data, 'base64'))
          //console.log('>>>>> ', stockInfo.id, +stockInfo.price.toFixed(2))
          setStocks(prevStocks => ({ state: 'success', data: { ...prevStocks.data, [stockInfo.id]: stockInfo } }))
        }

        ws.onclose = function close() {
          setStocks({ ...stocks, state: 'disconnected' })
        }
        //onLeavingPage => ws.close?
      })
    }
  }, [userStocks])

  return stocks
}
