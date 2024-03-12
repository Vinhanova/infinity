import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { toFixed } from '../../utils/utils'
import { Link } from 'react-router-dom'
import PieChart from './PieChart'
import { FC } from 'react'
import _ from 'underscore'

const InvestmentsOverviewPage: FC = () => {
  const { stocksList, cryptoList, watchlistAssetsList, purchasedAssetsList, listState, initialTickersInfoError, stocksInfoError, totalUSD, totalEUR, totalStocks, totalCryptocurrencies, exchangeRateInfoData, userTickersData } = useInvestmentsContext()

  return (
    <div className='my-4 w-full text-center sm:my-8'>
      {listState === 'pending' && <h1 className='mb-8'>A carregar...</h1>}

      {listState === 'error' &&
        ((initialTickersInfoError?.response?.status === 429 && <h1 className='mb-8 text-red-500'>Aviso: Muitos pedidos em simultâneo (Erro 429)</h1>) ||
          (stocksInfoError === 'No tickers found' && (
            <div className='mb-8'>
              <h3>
                Não foram encontrados ativos, pode adicionar novos ativos{' '}
                <Link to='/investments/new-asset' className='underline'>
                  aqui
                </Link>
                .
              </h3>
            </div>
          )))}

      {listState === 'success' &&
        (_.isEmpty(purchasedAssetsList) ? (
          <h1 className='p-2'>
            Não foram encontrados ativos, pode adicionar novos ativos{' '}
            <Link to='/investments/new-asset' className='underline'>
              aqui
            </Link>
            .
          </h1>
        ) : (
          <div className='mt-6 grid gap-y-6 xs:grid-cols-2 sm:m-6 sm:gap-8 lg:m-8 lg:grid-cols-3 xl:grid-cols-4 2xl:m-12'>
            {/* <div className='flex h-full w-full flex-col items-center justify-center gap-8 xs:w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12'> */}
            <div>
              <PieChart
                title='Todos os ativos'
                labels={_.keys(purchasedAssetsList)}
                dataContent={_.map(purchasedAssetsList, (stock: any) => {
                  //if (hasPercentage) return (((stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c) / totalEUR) * 100).toFixed(1)
                  return stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c
                })}
                total={totalEUR}
              />
              <div className='mx-4 flex justify-between rounded rounded-t-none border-x-2 border-b-2 border-white/10 py-2'>
                <div className='ml-2 text-left'>
                  <h3>Total: </h3>
                </div>
                <div className='mr-2 text-right'>
                  <h3>{toFixed(totalEUR, 2)} €</h3>
                </div>
              </div>
            </div>
            <PieChart title='Ações vs Criptomoedas' labels={['Ações', 'Criptomoedas']} dataContent={[totalStocks, totalCryptocurrencies]} total={totalEUR} />
            <div>
              <PieChart
                title='Ações'
                labels={_.keys(stocksList)}
                dataContent={_.map(stocksList, (stock: any) => {
                  //if (hasPercentage) return (((stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c) / totalEUR) * 100).toFixed(1)
                  return stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c
                })}
                total={totalStocks}
              />
              {totalStocks > 0 && (
                <div className='mx-4 flex justify-between rounded rounded-t-none border-x-2 border-b-2 border-white/10 py-2'>
                  <div className='ml-2 text-left'>
                    <h3>Total Ações: </h3>
                  </div>
                  <div className='mr-2 text-right'>
                    <h3>{toFixed(totalStocks, 2)} €</h3>
                  </div>
                </div>
              )}
            </div>
            <div>
              <PieChart
                title='Criptomoedas'
                labels={_.keys(cryptoList)}
                dataContent={_.map(cryptoList, (stock: any) => {
                  //if (hasPercentage) return (((stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c) / totalEUR) * 100).toFixed(1)
                  return stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c
                })}
                total={totalCryptocurrencies}
              />
              {totalCryptocurrencies > 0 && (
                <div className='mx-4 flex justify-between rounded rounded-t-none border-x-2 border-b-2 border-white/10 py-2'>
                  <div className='ml-2 text-left'>
                    <h3>Total Criptomoedas: </h3>
                  </div>
                  <div className='mr-2 text-right'>
                    <h3>{toFixed(totalCryptocurrencies, 2)} €</h3>
                  </div>
                </div>
              )}
            </div>
            <PieChart
              title='WatchList'
              labels={_.keys(watchlistAssetsList)}
              dataContent={_.map(watchlistAssetsList, (stock: any) => {
                //if (hasPercentage) return (((stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c) / totalEUR) * 100).toFixed(1)
                return stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c
              })}
              total={totalEUR}
            />
            <h3>Cotação USD/EUR: {exchangeRateInfoData?.c.toFixed(3)}</h3>
          </div>
        ))}
    </div>
  )
}

export default InvestmentsOverviewPage
