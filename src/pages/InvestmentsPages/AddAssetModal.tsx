import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { useDraggHandler } from '../../utils/useDraggHandler'
import { useUserAuth } from '../../Context/AuthContext'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { MdOutlineWarningAmber, MdClose } from 'react-icons/md'
import { IoIosArrowDropright } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa'
import { useAxios } from '../../utils/useAxios'
import { doc, setDoc } from 'firebase/firestore'
import { Asset } from '../../utils/types'
import { db } from '../../firebase'
import _ from 'underscore'

type Props = {
  addAssetModal: boolean
  setAddAssetModal: Function
}

const AddAssetModal: FC<Props> = ({ addAssetModal, setAddAssetModal }) => {
  const { closeEditAssetModal } = useInvestmentsContext()
  const { borderPosition, mouseDownHandler } = useDraggHandler()
  const { user } = useUserAuth()
  const [symbol, setSymbol] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<{ symbol: { stock: string; cryptocurrency: string }; name: { stock: string; cryptocurrency: string } }>({
    symbol: {
      stock: 'Exemplo: AAPL',
      cryptocurrency: 'Exemplo: BTC-USD'
    },
    name: {
      stock: 'Exemplo: Apple Inc.',
      cryptocurrency: 'Exemplo: Bitcoin USD'
    }
  })

  const [asset, setAsset] = useState<Asset>({
    name: '',
    quantity: 1,
    type: 'stock',
    state: 'purchased'
  })

  // #region isStock & isCryptocurrency

  const [isStock, setIsStock] = useState<boolean>(false)
  const [isCryptocurrency, setIsCryptocurrency] = useState<boolean>(false)

  useEffect(() => {
    if (asset.type === 'stock') setIsStock(true)
    else setIsStock(false)
  }, [asset])

  useEffect(() => {
    if (asset.type === 'cryptocurrency') setIsCryptocurrency(true)
    else setIsCryptocurrency(false)
  }, [asset])

  // #endregion

  // #region Search Functionality

  const [searchList, setSearchList] = useState<any[]>([])
  const [initialSearchLimit, setInitialSearchLimit] = useState<number>(3)
  const [maxSearchLimit, setMaxSearchLimit] = useState<number>(9)
  const [searchLimit, setSearchLimit] = useState<number>(initialSearchLimit)

  const { data: cryptoData, error: cryptoError, isLoading: cryptoIsLoading } = useAxios<any>(`https://finnhub.io/api/v1/crypto/symbol?exchange=coinbase&token=${import.meta.env.VITE_FINNHUB_API_KEY}`)

  useEffect(() => {
    let symbolFound: boolean = false

    setSearchList(
      _.filter(cryptoData, cryptoFiltered => cryptoFiltered.displaySymbol.includes(symbol.replace('-', '/')))
        .slice(0, 25)
        .filter(cryptoItem => {
          if (symbol === cryptoItem.displaySymbol.replace('/', '-')) {
            symbolFound = true
            return
          } else {
            return cryptoItem
          }
        })
        .slice(0, searchLimit)
    )

    setIsSymbolValid(symbolFound)
  }, [cryptoData, symbol, searchLimit])

  const addAsset = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await setDoc(doc(db, 'stocks', user.uid), { [symbol]: asset }, { merge: true })
      .then(res => {
        window.location.reload()
      })
      .catch(err => alert(err))
  }

  useEffect(() => {
    if (addAssetModal) closeEditAssetModal()
  }, [addAssetModal])

  // Symbol Validation

  const inputRef = useRef<HTMLInputElement>(null)
  const [isSymbolValid, setIsSymbolValid] = useState(false)

  const handleSymbolChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSymbol(e.target.value.toUpperCase())
  }

  useEffect(() => {
    if (!inputRef.current) return

    if (!isCryptocurrency) {
      inputRef.current.setCustomValidity('')
      return
    }

    if (isSymbolValid) {
      inputRef.current.setCustomValidity('')
    } else {
      inputRef.current.setCustomValidity('Símbolo não existe, selecione um por favor.\nExemplo: BTC-USD')
    }
  }, [isSymbolValid, isCryptocurrency])

  // #endregion

  return (
    <div className={addAssetModal ? 'absolute min-h-full min-w-full bg-custom-jet md:static md:flex md:min-w-min md:bg-custom-dark-jet' : 'hidden'}>
      <div className='hidden cursor-col-resize select-none border-l-2 pl-1 md:block' style={{ width: '2px' }} onMouseDown={mouseDownHandler}></div>
      <div
        className={`absolute z-10 flex min-h-full w-full flex-col items-center py-8 text-base
                    md:relative md:z-0 
                    md:text-sm
                    lg:text-base
                  `}
        style={{ width: borderPosition }}
      >
        <div className='absolute top-0 right-0 z-30 w-fit cursor-pointer p-2 text-3xl md:-left-1 md:top-1/2 md:-ml-4 md:p-0' onClick={() => setAddAssetModal(false)}>
          <MdClose className='md:hidden' />
          <IoIosArrowDropright className='hidden rounded-full bg-custom-dark-jet md:block' />
        </div>
        <form className='mt-6 flex flex-col gap-4 text-left [&_p]:mb-1' onSubmit={addAsset}>
          <div>
            <p>Tipo:</p>
            <input //
              checked={isStock}
              id='add-stock-radio'
              type='radio'
              name='type'
              value='stock'
              className='mr-1.5 mb-0.5 scale-110 cursor-pointer text-custom-tealblue focus:ring-0 focus:ring-offset-0'
              onChange={e => setAsset({ ...asset, type: e.target.value } as typeof asset)}
              required
            />
            <label htmlFor='add-stock-radio' className='mr-8 cursor-pointer focus:bg-transparent'>
              Ações
            </label>
            <input //
              checked={isCryptocurrency}
              id='add-cryptocurrency-radio'
              type='radio'
              name='type'
              value='cryptocurrency'
              className='mr-1.5 mb-0.5 scale-110 cursor-pointer text-custom-tealblue focus:ring-0 focus:ring-offset-0'
              onChange={e => setAsset({ ...asset, type: e.target.value } as typeof asset)}
              required
            />
            <label htmlFor='add-cryptocurrency-radio' className='cursor-pointer'>
              Criptomoedas
            </label>
          </div>
          <div>
            <p>Símbolo</p>
            <div className='flex'>
              <input ref={inputRef} type='text' className='peer w-full rounded py-1 px-2 text-sm uppercase text-custom-jet placeholder:opacity-60 invalid:text-red-500 focus:ring-2 focus:ring-custom-tealblue lg:text-base' placeholder={placeholder.symbol[asset.type]} value={symbol} onChange={e => handleSymbolChange(e)} required />
              {symbol !== '' && (
                <div className='-ml-8 mt-1.5 text-xl peer-valid:text-green-500 peer-invalid:text-red-500'>
                  {isSymbolValid ? ( //
                    <FaCheck />
                  ) : (
                    <MdOutlineWarningAmber />
                  )}
                </div>
              )}
            </div>
          </div>
          {isCryptocurrency && searchList.length > 0 && (
            <div className='flex flex-col items-center gap-y-2 px-12'>
              {searchList.map((cryptoItem: any) => (
                <button type='button' key={cryptoItem?.displaySymbol} className='!m-0 w-full cursor-pointer rounded bg-custom-jet px-2 py-1 text-center' onClick={() => setSymbol(cryptoItem.displaySymbol.replace('/', '-'))}>
                  {cryptoItem?.displaySymbol.replace('/', '-')}
                </button>
              ))}
              {searchList.length >= searchLimit && (
                <button type='button' key={1} className='flex w-min cursor-pointer justify-center px-3 py-1 font-semibold' onClick={() => setSearchLimit(searchLimit => (searchLimit === initialSearchLimit ? maxSearchLimit : initialSearchLimit))}>
                  {searchLimit === initialSearchLimit ? ( //
                    <FiMaximize2 />
                  ) : (
                    <FiMinimize2 />
                  )}
                </button>
              )}
            </div>
          )}
          <div>
            <p>Nome</p>
            <input className='w-full rounded py-1 px-2 text-sm text-custom-jet placeholder:opacity-60 focus:ring-2 focus:ring-custom-tealblue lg:text-base' placeholder={placeholder.name[asset.type]} value={asset.name} onChange={e => setAsset({ ...asset, name: e.target.value })} required />
          </div>
          <div>
            <p>Quantidade</p>
            <input //
              className='w-full rounded py-1 px-2 text-sm text-custom-jet focus:ring-2 focus:ring-custom-tealblue lg:text-base'
              value={asset.quantity}
              type='number'
              onChange={e => setAsset({ ...asset, quantity: +e.target.value })}
              inputMode='numeric'
              min={isStock ? 1 : 0.000000001}
              step={isStock ? 1 : 0.000000001}
              required
            />
          </div>
          {/* <div>
          <p>Watchlist</p>
        </div> */}
          <div className='mt-4 flex w-full justify-center text-center'>
            <button type='submit' id='submenu-link' className='flex rounded border-2 py-1.5 px-3'>
              <span>Adicionar</span>
              <FaPlus className='ml-1 mt-[5px] text-sm' />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAssetModal
