import { FC } from 'react'
import { Link } from 'react-router-dom'
import _ from 'underscore'
import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { toFixed } from '../../utils/utils'
import PieChart from './PieChart'

const InvestmentsOverviewPage: FC = () => {
  const { stocksList, cryptoList, watchlistAssetsList, purchasedAssetsList, listState, initialTickersInfoError, stocksInfoError, totalUSD, totalEUR, exchangeRateInfoData } = useInvestmentsContext()

  return (
    <div className='my-4 w-full text-center sm:my-8'>
      {listState === 'pending' && <h1 className='mb-8'>Loading...</h1>}

      {listState === 'error' &&
        ((initialTickersInfoError?.response?.status === 429 && <h1 className='mb-8 text-red-500'>Warning: Slow Down (429)</h1>) ||
          (stocksInfoError === 'No tickers found' && (
            <div className='mb-8'>
              <h3>
                0 assets found, you can add a new asset{' '}
                <Link to='/investments/new-asset' className='underline'>
                  here
                </Link>
                .
              </h3>
            </div>
          )))}

      {listState === 'success' &&
        (_.isEmpty(purchasedAssetsList) ? (
          <h1 className='p-2'>No stocks found</h1>
        ) : (
          <div className='flex items-center justify-center'>
            <div className='flex h-full w-full flex-col items-center justify-center gap-8 xs:w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12'>
              <div className='flex w-full justify-between px-4 xs:px-0'>
                <div className='text-left'>
                  <h1>Total: </h1>
                  <h1>(USD/EUR: {exchangeRateInfoData?.c.toFixed(3)})</h1>
                </div>
                <div className='text-right'>
                  <h1>{totalUSD} $</h1>
                  <h1>{toFixed(totalEUR, 2)} €</h1>
                </div>
              </div>
              <div className='flex w-full flex-col items-center justify-center'>
                <PieChart title='Portfolio' list={purchasedAssetsList} />
                <PieChart title='WatchList' list={watchlistAssetsList} />
                <PieChart title='Cryptocurrencies' list={cryptoList} />
                <PieChart title='Stocks' list={stocksList} />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default InvestmentsOverviewPage
