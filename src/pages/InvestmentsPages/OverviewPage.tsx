import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { toFixed } from '../../utils/utils'
import { Link } from 'react-router-dom'
import PieChart from './PieChart'
import { FC } from 'react'
import _ from 'underscore'
import Card from './Card'

const InvestmentsOverviewPage: FC = () => {
  const { stocksList, cryptoList, watchlistAssetsList, purchasedAssetsList, listState, initialTickersInfoError, stocksInfoError, totalUSD, totalEUR, totalStocks, totalCryptocurrencies, exchangeRateInfoData, userTickersData } = useInvestmentsContext()

  return (
    <div className='w-full text-center'>
      {listState === 'pending' && <h1 className='my-8'>A carregar...</h1>}

      {listState === 'error' &&
        ((initialTickersInfoError?.response?.status === 429 && <h1 className='my-12 text-red-500'>Aviso: Muitos pedidos em simultâneo (Erro 429 - Limite da API)</h1>) ||
          (stocksInfoError === 'No tickers found' && (
            <div className='my-8'>
              <h3>Não foram encontrados ativos, experimente adicionar um primeiro</h3>
            </div>
          )))}

      {listState === 'success' &&
        (_.isEmpty(purchasedAssetsList) ? (
          <h1 className='p-2'>Não tem ativos, experimente adicionar um primeiro</h1>
        ) : (
          <div className='m-4 grid gap-y-4 xs:grid-cols-2 sm:m-6 sm:gap-8 lg:m-8 xl:grid-cols-3 2xl:xl:grid-cols-4 2xl:m-12'>
            {/* <div className='flex h-full w-full flex-col items-center justify-center gap-8 xs:w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12'> */}
            {totalStocks && totalCryptocurrencies ? (
              <Card
                content={
                  <>
                    <PieChart
                      title='Todos os ativos'
                      labels={_.keys(purchasedAssetsList)}
                      dataContent={_.map(purchasedAssetsList, (stock: any) => {
                        //if (hasPercentage) return (((stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c) / totalEUR) * 100).toFixed(1)
                        return stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c
                      })}
                      total={totalEUR}
                    />
                    <div className='mx-4 flex justify-between py-2'>
                      <div className='text-left'>
                        <h3>Total: </h3>
                      </div>
                      <div className='text-right'>
                        <h3>{toFixed(totalEUR, 2)} €</h3>
                      </div>
                    </div>
                  </>
                }
              />
            ) : (
              <></>
            )}
            {totalStocks && totalCryptocurrencies ? (
              <Card
                content={
                  <>
                    <PieChart title='Ações vs Criptomoedas' labels={['Ações', 'Criptomoedas']} dataContent={[totalStocks, totalCryptocurrencies]} total={totalEUR} />{' '}
                  </>
                }
              />
            ) : (
              <></>
            )}
            {totalStocks > 0 && (
              <Card
                content={
                  <>
                    <PieChart
                      title='Ações'
                      labels={_.keys(stocksList)}
                      dataContent={_.map(stocksList, (stock: any) => {
                        //if (hasPercentage) return (((stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c) / totalEUR) * 100).toFixed(1)
                        return stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c
                      })}
                      total={totalStocks}
                    />
                    <div className='mx-4 flex justify-between py-2'>
                      <div className='text-left'>
                        <h3>Total Ações: </h3>
                      </div>
                      <div className='text-right'>
                        <h3>{toFixed(totalStocks, 2)} €</h3>
                      </div>
                    </div>
                  </>
                }
              />
            )}
            {totalCryptocurrencies > 0 && (
              <Card
                content={
                  <>
                    <PieChart
                      title='Criptomoedas'
                      labels={_.keys(cryptoList)}
                      dataContent={_.map(cryptoList, (stock: any) => {
                        //if (hasPercentage) return (((stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c) / totalEUR) * 100).toFixed(1)
                        return stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c
                      })}
                      total={totalCryptocurrencies}
                    />

                    <div className='mx-4 flex justify-between py-2'>
                      <div className='text-left'>
                        <h3>Total Criptomoedas: </h3>
                      </div>
                      <div className='text-right'>
                        <h3>{toFixed(totalCryptocurrencies, 2)} €</h3>
                      </div>
                    </div>
                  </>
                }
              />
            )}
            {/* <OverviewCard
              content={
                <>
                  <PieChart
                    title='WatchList'
                    labels={_.keys(watchlistAssetsList)}
                    dataContent={_.map(watchlistAssetsList, (stock: any) => {
                      //if (hasPercentage) return (((stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c) / totalEUR) * 100).toFixed(1)
                      return stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c
                    })}
                    total={totalEUR}
                  />
                </>
              }
            /> */}
            <Card
              content={
                <>
                  <div className='mx-4 flex h-full items-center justify-center py-2'>
                    <h3 className='my-2'>Cotação USD/EUR: {exchangeRateInfoData?.c ? exchangeRateInfoData?.c.toFixed(3) : '(Erro API)'}</h3>
                  </div>
                </>
              }
            />
          </div>
        ))}
    </div>
  )
}

export default InvestmentsOverviewPage
