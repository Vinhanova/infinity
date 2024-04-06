import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { useDraggHandler } from '../../utils/useDraggHandler'
import { useUserAuth } from '../../Context/AuthContext'
import { IoIosArrowDropright } from 'react-icons/io'
import { doc, setDoc } from 'firebase/firestore'
import { Asset } from '../../utils/types'
import { FC, useEffect, useState } from 'react'
import { db } from '../../firebase'
import { FaPlus } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

type Props = {
  addAssetModal: boolean
  setAddAssetModal: Function
}

const AddAssetModal: FC<Props> = ({ addAssetModal, setAddAssetModal }) => {
  const { closeEditAssetModal } = useInvestmentsContext()
  const { borderPosition, mouseDownHandler } = useDraggHandler()
  const { user } = useUserAuth()
  const [ticker, setTicker] = useState<string>('')
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

  const addAsset = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await setDoc(doc(db, 'stocks', user.uid), { [ticker.toUpperCase()]: asset }, { merge: true })
      .then(res => {
        window.location.reload()
      })
      .catch(err => alert(err))
  }

  useEffect(() => {
    if (addAssetModal) closeEditAssetModal()
  }, [addAssetModal])

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
        <div
          className='absolute top-0 right-0 z-30 w-fit cursor-pointer p-2 text-3xl md:-left-1 md:top-1/2 md:-ml-4 md:p-0'
          onClick={() => {
            setAddAssetModal(false)
          }}
        >
          <MdClose className='md:hidden' />
          <IoIosArrowDropright className='hidden rounded-full bg-custom-dark-jet md:block' />
        </div>
        <form className='mt-6 flex flex-col gap-4 text-left [&_p]:mb-1' onSubmit={addAsset}>
          <div>
            <p>Tipo:</p>
            <input checked={asset.type === 'stock'} id='add-stock-radio' type='radio' name='type' value='stock' className='mr-1.5 mb-0.5 scale-110 cursor-pointer text-custom-tealblue focus:ring-0 focus:ring-offset-0' onChange={e => setAsset({ ...asset, type: e.target.value } as typeof asset)} required />
            <label htmlFor='add-stock-radio' className='mr-8 cursor-pointer focus:bg-transparent'>
              Ações
            </label>
            <input checked={asset.type === 'cryptocurrency'} id='add-cryptocurrency-radio' type='radio' name='type' value='cryptocurrency' className='mr-1.5 mb-0.5 scale-110 cursor-pointer text-custom-tealblue focus:ring-0 focus:ring-offset-0' onChange={e => setAsset({ ...asset, type: e.target.value } as typeof asset)} required />
            <label htmlFor='add-cryptocurrency-radio' className='cursor-pointer'>
              Criptomoedas
            </label>
          </div>
          <div>
            <p>Símbolo</p>
            <input className='w-full rounded py-1 px-2 text-sm text-custom-jet placeholder:opacity-60 focus:ring-2 focus:ring-custom-tealblue lg:text-base' placeholder={placeholder.symbol[asset.type]} value={ticker} onChange={e => setTicker(e.target.value)} required />
          </div>
          <div>
            <p>Nome</p>
            <input className='w-full rounded py-1 px-2 text-sm text-custom-jet placeholder:opacity-60 focus:ring-2 focus:ring-custom-tealblue lg:text-base' placeholder={placeholder.name[asset.type]} value={asset.name} onChange={e => setAsset({ ...asset, name: e.target.value })} required />
          </div>
          <div>
            <p>Quantidade</p>
            <input className='w-full rounded py-1 px-2 text-sm text-custom-jet focus:ring-2 focus:ring-custom-tealblue lg:text-base' value={asset.quantity} type='number' onChange={e => setAsset({ ...asset, quantity: +e.target.value })} inputMode='numeric' min={asset.type === 'stock' ? 1 : 0.000000001} step={asset.type === 'stock' ? 1 : 0.000000001} required />
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
