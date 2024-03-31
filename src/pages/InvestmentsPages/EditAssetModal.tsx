import { useUserAuth } from '../../Context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Asset } from '../../utils/types'
import { FC, useEffect, useState } from 'react'
import { db } from '../../firebase'
import { MdClose, MdEdit } from 'react-icons/md'
import { useInvestmentsContext } from '../../Context/InvestmentsContext'

type Props = {
  setAddAssetModal: Function
}

const EditAssetModal: FC<Props> = ({ setAddAssetModal }) => {
  const { editAssetModal, closeEditAssetModal, oldAssetInfo } = useInvestmentsContext()
  const navigate = useNavigate()
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

  const editAsset = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await setDoc(doc(db, 'stocks', user.uid), { [ticker.toUpperCase()]: asset }, { merge: true })
      .then(res => {
        //window.location.reload()
      })
      .catch(err => alert(err))
  }

  useEffect(() => {
    if (editAssetModal) setAddAssetModal(false)
  }, [editAssetModal])

  return (
    <div className={editAssetModal ? 'absolute z-10 flex h-full w-full flex-col items-center bg-custom-jet py-8 sm:relative sm:z-0 sm:w-4/12 sm:border-l-2 sm:bg-custom-dark-jet sm:p-12' : 'hidden'}>
      <div className='absolute top-0 left-0 float-left cursor-pointer p-2' onClick={closeEditAssetModal}>
        <MdClose className='text-3xl' />
      </div>
      <form className='flex flex-col gap-4 text-left [&_p]:mb-1' onSubmit={editAsset}>
        <div>
          <p>Tipo:</p>
          <input checked={asset.type === 'stock'} id='stock-radio' type='radio' name='type' value='stock' className='mr-1.5 mb-0.5 scale-110 cursor-auto text-custom-tealblue focus:ring-0 focus:ring-offset-0' onChange={e => setAsset({ ...asset, type: e.target.value } as typeof asset)} required />
          <label htmlFor='stock-radio' className='mr-8 cursor-auto focus:bg-transparent'>
            Ações
          </label>
          <input checked={asset.type === 'cryptocurrency'} id='cryptocurrency-radio' type='radio' name='type' value='cryptocurrency' className='mr-1.5 mb-0.5 scale-110 cursor-auto text-custom-tealblue focus:ring-0 focus:ring-offset-0' onChange={e => setAsset({ ...asset, type: e.target.value } as typeof asset)} required />
          <label htmlFor='cryptocurrency-radio' className='cursor-auto'>
            Criptomoedas
          </label>
        </div>
        <div>
          <p>Símbolo</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet placeholder:opacity-60 focus:ring-2 focus:ring-custom-tealblue' placeholder={placeholder.symbol[asset.type]} value={ticker} onChange={e => setTicker(e.target.value)} required />
        </div>
        <div>
          <p>Nome</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet placeholder:opacity-60 focus:ring-2 focus:ring-custom-tealblue' placeholder={placeholder.name[asset.type]} value={oldAssetInfo.name} onChange={e => setAsset({ ...asset, name: e.target.value })} required />
        </div>
        <div>
          <p>Quantidade</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet focus:ring-2 focus:ring-custom-tealblue' value={asset.quantity} type='number' onChange={e => setAsset({ ...asset, quantity: +e.target.value })} inputMode='numeric' min={asset.type === 'stock' ? 1 : 0.000000001} step={asset.type === 'stock' ? 1 : 0.000000001} required />
        </div>
        {/* <div>
          <p>Watchlist</p>
        </div> */}
        <div className='mt-4 flex w-full justify-center text-center'>
          <button type='submit' id='submenu-link' className='flex rounded border-2 py-1.5 px-3'>
            <span>Editar</span>
            <MdEdit className='ml-1 mt-[5px] text-sm' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditAssetModal
