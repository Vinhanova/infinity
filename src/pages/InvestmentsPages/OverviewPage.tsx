import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { ImSpinner2 } from 'react-icons/im'
import { toFixed } from '../../utils/utils'
import PieChart from './PieChart'
import { FC } from 'react'
import _ from 'underscore'
import Card from './Card'

const InvestmentsOverviewPage: FC = () => {
  const { stocksList, cryptoList, watchlistAssetsList, purchasedAssetsList, listState, initialTickersInfoError, stocksInfoError, totalUSD, totalEUR, totalStocks, totalCryptocurrencies, exchangeRateInfoData, userTickersData } = useInvestmentsContext()

  return (
    <div className='w-full text-center'>
      {listState === 'pending' && (
        <div className='my-4 mt-6 flex justify-center text-2xl sm:my-8 sm:mt-[3.5rem] lg:my-0 lg:mt-24'>
          <ImSpinner2 className='animate-spin' />
        </div>
      )}

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
          <div className='m-2.5 flex flex-col items-center gap-y-4 xs:m-4 xs:gap-4 sm:m-6 sm:items-start sm:gap-6 lg:m-8 lg:gap-8 2xl:m-12'>
            <div className='grid gap-y-4 xs:grid-cols-2 xs:gap-4 sm:gap-6 lg:gap-8 xl:grid-cols-3 2xl:xl:grid-cols-4'>
              {/* <div className='flex h-full w-full flex-col items-center justify-center gap-8 xs:w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12'> */}
              {totalStocks && totalCryptocurrencies ? (
                <Card>
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
                </Card>
              ) : (
                <></>
              )}
              {totalStocks && totalCryptocurrencies ? (
                <Card>
                  <PieChart title='Ações vs Criptomoedas' labels={['Ações', 'Criptomoedas']} dataContent={[totalStocks, totalCryptocurrencies]} total={totalEUR} />{' '}
                </Card>
              ) : (
                <></>
              )}
              {totalStocks > 0 && (
                <Card>
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
                </Card>
              )}
              {totalCryptocurrencies > 0 && (
                <Card>
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
                </Card>
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
            </div>
            <Card className='w-fit'>
              <div className='mx-4 flex h-full items-center justify-center py-2'>
                <h3 className='my-2'>Cotação USD/EUR: {exchangeRateInfoData?.c ? exchangeRateInfoData?.c.toFixed(3) : '(Erro API)'}</h3>
              </div>
            </Card>
          </div>
        ))}
    </div>
  )
}

export default InvestmentsOverviewPage
