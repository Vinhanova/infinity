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
        <div className='mt-4 mb-2 w-11/12 text-center sm:mt-8 sm:mb-6 sm:w-3/4'>
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
              <>
                <div className='relative overflow-x-auto sm:rounded-lg'>
                  <table className='w-full text-left text-base'>
                    <thead className='border-b-2 uppercase'>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          <div className='flex items-center'>
                            Asset Name
                            <a href='#'>
                              <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                                <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                              </svg>
                            </a>
                          </div>
                        </th>
                        <th scope='col' className='bg-white/5 px-6 py-3'>
                          <div className='flex items-center justify-end'>
                            Price
                            <a href='#'>
                              <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                                <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                              </svg>
                            </a>
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          <div className='flex items-center justify-end'>
                            24h Change
                            <a href='#'>
                              <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                                <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                              </svg>
                            </a>
                          </div>
                        </th>
                        <th scope='col' className='bg-white/5 px-6 py-3'>
                          <div className='flex items-center justify-end'>
                            Portfolio 24h Change
                            <a href='#'>
                              <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                                <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                              </svg>
                            </a>
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          <div className='flex items-center justify-end'>
                            Portfolio Value
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
                          <tr key={stock.id} className='border-t border-white/20'>
                            <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium'>
                              {userTickersData![stock.id].name}
                              <span className='ml-1 hidden sm:inline-block'>{`(${stock.id})`}</span>:
                            </th>
                            <td className='bg-white/5 px-6 py-4 text-right'>{stock.price.toFixed(stock.price < 1 ? 3 : 2)} $</td>
                            <td className='px-6 py-4 text-right'>
                              <span className={stock.changePercent === null ? '' : stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>{stock.change ? (stock.change > 0 ? '+' : '') + `${stock.change?.toFixed(2)} (${(stock.changePercent > 0 ? '+' : '') + stock.changePercent?.toFixed(2)}%)` : `${(stock.changePercent > 0 ? '+' : '') + stock.changePercent?.toFixed(2)}%`}</span>
                            </td>
                            <td className={`bg-white/5 px-6 py-4 text-right ${stock.changePercent === null ? `` : stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.change ? `${(stock.change * userTickersData![stock.id].quantity * exchangeRateInfoData?.c).toFixed(2)} €` : 'Loading...'}</td>
                            <td className='px-6 py-4 text-right'>{toFixed(stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c, 2)} €</td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr className='border-t-2 font-semibold uppercase'>
                        <th scope='row' className='px-6 py-3'>
                          Total
                          <span className='text-sm'> (USD/EUR: {exchangeRateInfoData?.c.toFixed(3)})</span>:
                        </th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='px-6 py-3 text-right'>{toFixed(totalEUR, 2)} €</td>
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
