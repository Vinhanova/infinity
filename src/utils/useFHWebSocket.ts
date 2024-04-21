import { useEffect, useState } from 'react'

export const useFHWebSocket = (userStocks: any) => {
  const [stocks, setStocks] = useState<any>({})

  useEffect(() => {
    if (userStocks) {
      const socket = new WebSocket(`wss://ws.finnhub.io?token=${import.meta.env.VITE_FINNHUB_API_KEY}`)

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
        setStocks((newStocks: any) => ({ ...newStocks, [data.s]: data }))
      })

      // Unsubscribe
      var unsubscribe = function (symbol: string) {
        socket.send(JSON.stringify({ type: 'unsubscribe', symbol: symbol }))
      }
    }
  }, [userStocks])

  return stocks
}
