import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { toFixed } from '../../utils/utils'
import { Link } from 'react-router-dom'
import { FC } from 'react'
import _ from 'underscore'

const InvestmentsPage: FC = () => {
  const { purchasedAssetsList, listState, initialTickersInfoError, stocksInfoError, userTickersData, exchangeRateInfoData, totalUSD, totalEUR } = useInvestmentsContext()

  return (
    <>
      <div className='flex flex-col items-center space-x-3'>
        <div className='mt-4 mb-2 w-11/12 text-center sm:mb-0 lg:mt-8 xl:mb-6 xl:w-3/4'>
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
              <h1 className='p-2'>Não tem ativos</h1>
            ) : (
              <>
                <div className='relative overflow-x-auto sm:rounded-lg'>
                  <table className='w-full text-left text-sm lg:text-base'>
                    <thead className='border-b-2 uppercase'>
                      <tr>
                        <th scope='col' className='px-3 py-2 lg:px-3 lg:py-4 xl:px-6 xl:py-3'>
                          <div className='flex items-center'>
                            Nome
                            <a href='#'>
                              <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                                <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                              </svg>
                            </a>
                          </div>
                        </th>
                        <th scope='col' className='bg-white/5 px-3 py-2 lg:px-3 lg:py-4 xl:px-6 xl:py-3'>
                          <div className='flex items-center justify-end'>
                            Preço
                            <a href='#'>
                              <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                                <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                              </svg>
                            </a>
                          </div>
                        </th>
                        <th scope='col' className='hidden px-3 py-2 sm:table-cell lg:px-3 lg:py-4 xl:px-6 xl:py-3'>
                          <div className='flex items-center justify-end'>
                            Alteração 24h
                            <a href='#'>
                              <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                                <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                              </svg>
                            </a>
                          </div>
                        </th>
                        <th scope='col' className='hidden bg-white/5 px-3 py-2 sm:table-cell lg:px-3 lg:py-4 xl:px-6 xl:py-3'>
                          <div className='flex items-center justify-end'>
                            Alteração no Portfólio 24h
                            <a href='#'>
                              <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                                <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                              </svg>
                            </a>
                          </div>
                        </th>
                        <th scope='col' className='px-3 py-2 lg:px-3 lg:py-4 xl:px-6 xl:py-3'>
                          <div className='flex items-center justify-end'>
                            Portfólio
                            <a href='#'>
                              <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                                <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                              </svg>
                            </a>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {_.map(purchasedAssetsList, (stock: any) => {
                        if (userTickersData[stock.id].quantity === 0) return
                        return (
                          <tr key={stock.id} className='border-t border-white/20 text-sm hover:bg-white/10 lg:text-base'>
                            <th scope='row' className='whitespace-nowrap px-[3px] py-[7px] font-medium lg:px-2 lg:py-3 xl:px-6 xl:py-4'>
                              <span className='hidden lg:inline-block'>{userTickersData![stock.id].name} (</span>
                              {stock.id}
                              <span className='hidden lg:inline-block'>)</span>
                            </th>
                            <td className='bg-white/5 px-[3px] py-[7px] text-right text-gray-300 lg:px-2 lg:py-3 xl:px-6 xl:py-4'>{stock.price.toFixed(stock.price < 1 ? 3 : 2)} $</td>
                            <td className='px-[3px] py-[7px] text-right lg:px-2 lg:py-3 xl:px-6 xl:py-4'>
                              <span className={stock.changePercent === null ? '' : stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>{stock.change ? (stock.change > 0 ? '+' : '') + `${stock.change?.toFixed(2)} (${(stock.changePercent > 0 ? '+' : '') + stock.changePercent?.toFixed(2)}%)` : `${(stock.changePercent > 0 ? '+' : '') + stock.changePercent?.toFixed(2)}%`}</span>
                            </td>
                            <td className={`hidden bg-white/5 px-[3px] py-[7px] text-right sm:table-cell lg:px-2 lg:py-3 xl:px-6 xl:py-4 ${stock.changePercent === null ? `` : stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.change ? `${(stock.change * userTickersData![stock.id].quantity * exchangeRateInfoData?.c).toFixed(2)} €` : 'A carregar...'}</td>
                            <td className='hidden px-[3px] py-[7px] text-right text-gray-200 sm:table-cell lg:px-2 lg:py-3 xl:px-6 xl:py-4'>{toFixed(stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c, 2)} €</td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr className='border-t-2 font-semibold uppercase'>
                        <th scope='row' className='px-[3px] py-[7px] lg:px-2 lg:py-3 xl:px-6 xl:py-4'>
                          Total
                          <span className='text-sm'> (USD/EUR: {exchangeRateInfoData?.c.toFixed(3)})</span>:
                        </th>
                        <td></td>
                        <td className='hidden sm:table-cell'></td>
                        <td className='hidden sm:table-cell'></td>
                        <td className='px-[3px] py-[7px] text-right lg:px-2 lg:py-3 xl:px-6 xl:py-4'>{toFixed(totalEUR, 2)} €</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  )
}

export default InvestmentsPage
