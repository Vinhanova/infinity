import { FC } from 'react'
import { useGetTicker } from '../../utils/useGetTickers'

const WalletPage: FC = () => {
  const { tickerInfo: tesla } = useGetTicker('TSLA')
  const { tickerInfo: apple } = useGetTicker('AAPL')

  return (
    <>
      <div>WalletPage</div>
      <br />
      <h1>Tesla:</h1>
      {!tesla || !apple ? (
        <h1>Loading...</h1>
      ) : (
        <h1>
          {tesla?.c} & {apple?.c}
        </h1>
      )}
    </>
  )
}

export default WalletPage
