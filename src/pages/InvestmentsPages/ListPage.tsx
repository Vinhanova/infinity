import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { toFixed } from '../../utils/utils'
import deleteAssetFS from '../../utils/useDeleteAsset'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { SlOptions } from 'react-icons/sl'
import { ImSpinner2 } from 'react-icons/im'
import { MdEdit } from 'react-icons/md'
import { Dropdown } from 'flowbite-react'
import { useUserAuth } from '../../Context/AuthContext'
import { FC } from 'react'
import _ from 'underscore'
import Card from './Card'

const InvestmentsPage: FC = () => {
  const { purchasedAssetsList, listState, initialTickersInfoError, stocksInfoError, userTickersData, exchangeRateInfoData, totalUSD, totalEUR, openEditAssetModal } = useInvestmentsContext()
  const { user } = useUserAuth()
  const navigate = useNavigate()

  function deleteHandler(assetId: string): void {
    if (confirm(`Deseja remover ${userTickersData![assetId].name} permanentemente?`)) {
      deleteAssetFS('stocks', user.uid, assetId).then(() => navigate(0))
    }
  }

  return (
    <>
      <div className='flex w-full flex-col items-center space-x-3'>
        <div className='mt-2.5 mb-2.5 w-full px-2.5 text-center xs:w-11/12 xs:p-0 sm:mt-6 sm:mb-0 lg:mt-8 xl:mb-6 xl:w-3/4'>
          {listState === 'pending' && (
            <div className='my-4 flex justify-center text-2xl sm:my-8 lg:my-0 lg:mt-16'>
              <ImSpinner2 className='animate-spin' />
            </div>
          )}

          {listState === 'error' &&
            ((initialTickersInfoError?.response?.status === 429 && <h1 className='my-4 text-red-500 lg:my-4'>Aviso: Muitos pedidos em simultâneo (Erro 429 - Limite da API)</h1>) ||
              (stocksInfoError === 'No tickers found' && (
                <div className='my-4 lg:my-0'>
                  <h3>Não foram encontrados ativos, experimente adicionar um primeiro</h3>
                </div>
              )))}

          {listState === 'success' &&
            (_.isEmpty(purchasedAssetsList) ? (
              <h1 className='p-2'>Não tem ativos, experimente adicionar um primeiro</h1>
            ) : (
              <Card>
                <table className='w-full text-left text-sm lg:text-base'>
                  <thead className='border-b-2'>
                    <tr>
                      <th scope='col' className='px-[3px] py-[7px] pr-2 lg:px-2 lg:py-3 xl:px-6 xl:py-3'>
                        <div className='flex items-center'>
                          Nome
                          <a href='#'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                              <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                            </svg>
                          </a>
                        </div>
                      </th>
                      <th scope='col' className='bg-white/5 px-3 py-2 lg:px-2 lg:py-3 xl:px-6 xl:py-3'>
                        <div className='flex items-center justify-end'>
                          Preço
                          <a href='#'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                              <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                            </svg>
                          </a>
                        </div>
                      </th>
                      <th scope='col' className='px-3 py-2 lg:px-2 lg:py-3 xl:px-6 xl:py-3'>
                        <div className='flex items-center justify-end'>
                          24h %
                          <a href='#'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                              <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                            </svg>
                          </a>
                        </div>
                      </th>
                      <th scope='col' className='hidden bg-white/5 px-3 py-2 sm:table-cell lg:px-2 lg:py-3 xl:px-6 xl:py-3'>
                        <div className='flex items-center justify-end'>
                          Portfólio 24h %
                          <a href='#'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                              <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                            </svg>
                          </a>
                        </div>
                      </th>
                      <th scope='col' className='hidden px-3 py-2 sm:table-cell lg:px-2 lg:py-3 xl:px-6 xl:py-3'>
                        <div className='flex items-center justify-end'>
                          Portfólio
                          <a href='#'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='ml-1 h-3 w-3' aria-hidden='true' fill='currentColor' viewBox='0 0 320 512'>
                              <path d='M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z' />
                            </svg>
                          </a>
                        </div>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(purchasedAssetsList, (stock: any) => {
                      if (userTickersData[stock.id].quantity === 0) return
                      return (
                        /* Name */
                        <tr key={stock.id} className='border-t border-white/20 text-sm hover:bg-white/10 lg:text-base'>
                          <th scope='row' className='whitespace-nowrap px-[3px] py-[7px] font-medium lg:px-2 lg:py-3 xl:px-6 xl:py-4'>
                            {window.innerWidth < 1024 ? (
                              stock.id.split('-')[0]
                            ) : (
                              <>
                                {userTickersData![stock.id].name}
                                <span className='ml-2 font-extralight opacity-40'>{stock.id.split('-')[0]}</span>
                              </>
                            )}
                          </th>
                          {/* Price */}
                          <td className='bg-white/5 px-[3px] py-[7px] text-right text-gray-300 lg:px-2 lg:py-3 xl:px-6 xl:py-4'>
                            {stock.changePercent !== null //
                              ? `${stock.price.toFixed(stock.price < 1 ? 3 : 2)} $`
                              : 'Erro API *'}
                          </td>
                          {/* 24h */}
                          <td className='px-[3px] py-[7px] text-right lg:px-2 lg:py-3 xl:px-6 xl:py-4'>
                            <span className={stock.changePercent === null ? '' : stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}>
                              {stock.changePercent !== null //
                                ? stock.change //
                                  ? (stock.change > 0 ? '+' : '') +
                                    `${stock.change?.toFixed(2)} (${
                                      (stock.changePercent > 0 //
                                        ? '+'
                                        : '') + stock.changePercent?.toFixed(2)
                                    }%)`
                                  : `${
                                      (stock.changePercent > 0 //
                                        ? '+'
                                        : '') + (stock.price - stock.price / (stock.changePercent / 100 + 1))?.toFixed(2)
                                    } (${stock.changePercent?.toFixed(2)}%)`
                                : '... *'}
                            </span>
                          </td>
                          {/* Portfolio 24h */}
                          <td className={`hidden bg-white/5 px-[3px] py-[7px] text-right sm:table-cell lg:px-2 lg:py-3 xl:px-6 xl:py-4 ${stock.changePercent === null ? `` : stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.changePercent !== null //
                              ? stock.change //
                                ? `${(stock.change * userTickersData![stock.id].quantity * (exchangeRateInfoData?.c ? exchangeRateInfoData.c : 0.932)).toFixed(2)} €`
                                : `${((stock.changePercent / 100) * stock.price * userTickersData![stock.id].quantity * (exchangeRateInfoData?.c ? exchangeRateInfoData.c : 0.932)).toFixed(2)} €`
                              : '... *'}
                          </td>
                          {/* Portfolio */}
                          <td className='hidden px-[3px] py-[7px] text-right text-gray-200 sm:table-cell lg:px-2 lg:py-3 xl:px-6 xl:py-4'>
                            {stock.changePercent !== null //
                              ? `${toFixed(stock.price * userTickersData![stock.id].quantity * (exchangeRateInfoData?.c ? exchangeRateInfoData.c : 0.932), 2)} €`
                              : '... *'}
                          </td>
                          <td>
                            <Dropdown
                              label=''
                              renderTrigger={() => (
                                <span>
                                  <SlOptions className='mx-2 cursor-pointer sm:text-lg' />
                                </span>
                              )}
                              theme={{
                                content: 'py-1 focus:outline-none bg-custom-dark-jet rounded-[0.15rem]',
                                floating: {
                                  item: {
                                    base: 'flex w-full cursor-pointer items-center justify-start px-8 pl-4 py-2 text-sm text-white hover:text-custom-tealblue-hl focus:outline-none'
                                  },
                                  style: {
                                    auto: 'border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white'
                                  }
                                }
                              }}
                            >
                              {/* <Dropdown.Header>Example</Dropdown.Header> */}
                              <Dropdown.Item icon={MdEdit} onClick={() => openEditAssetModal(stock.id)}>
                                Editar
                              </Dropdown.Item>
                              <Dropdown.Item icon={RiDeleteBin6Line} onClick={() => deleteHandler(stock.id)}>
                                Remover
                              </Dropdown.Item>
                              {/* <Dropdown.Divider /> */}
                            </Dropdown>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr className='border-t-2 font-semibold'>
                      <th scope='row' className='px-[3px] py-[7px] lg:px-2 lg:py-3 xl:px-6 xl:py-4'>
                        Total
                        <span className='hidden text-sm lg:inline'> (USD/EUR: {exchangeRateInfoData?.c.toFixed(3)})</span>:
                      </th>
                      <td></td>
                      <td className='hidden sm:table-cell'></td>
                      <td className='hidden sm:table-cell'></td>
                      <td className='px-[3px] py-[7px] text-right lg:px-2 lg:py-3 xl:px-6 xl:py-4'>{toFixed(totalEUR, 2)} €</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
                <p className='text-right text-xs italic text-gray-400'>*Quando for realizada uma nova transação o preço será atualizado (mercado pode estar fechado)</p>
              </Card>
            ))}
        </div>
      </div>
    </>
  )
}

export default InvestmentsPage
