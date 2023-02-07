import { useEffect, useState } from 'react'
import protobuf from 'protobufjs'
import { Buffer } from 'buffer'
import _ from 'underscore'

export const useYFWebSocket = (userStocks: any) => {
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
          //console.log('>>>>> ', stockInfo.id, +stockInfo.price.toFixed(2))
          setStocks(stocks => ({ ...stocks, [stockInfo.id]: stockInfo }))
        }

        ws.onclose = function close() {
          console.log('disconnected')
        }
        //onLeavingPage => ws.close?
      })
    }
  }, [userStocks])

  return stocks
}
