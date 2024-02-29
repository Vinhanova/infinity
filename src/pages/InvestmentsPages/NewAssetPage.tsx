import { useUserAuth } from '../../Context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Asset } from '../../utils/types'
import { FC, useState } from 'react'
import { db } from '../../firebase'
import { GoPlus } from 'react-icons/go'

const NewAssetPage: FC = () => {
  const navigate = useNavigate()
  const { user } = useUserAuth()
  const [ticker, setTicker] = useState<string>('')

  const [asset, setAsset] = useState<Asset>({
    name: '',
    quantity: 1,
    type: '',
    state: 'purchased'
  })

  const addAsset = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await setDoc(doc(db, 'stocks', user.uid), { [ticker.toUpperCase()]: asset }, { merge: true })
      .then(res => navigate('/investments/list'))
      .catch(err => alert(err))
  }

  return (
    <div className='my-8 flex flex-col items-center justify-center text-center sm:m-12'>
      <form className='flex w-8/12 flex-col gap-4 text-left md:w-6/12 lg:w-4/12 [&_p]:mb-1' onSubmit={addAsset}>
        <div>
          <p>Tipo:</p>
          <input id='stock-radio' type='radio' name='type' value='stock' className='mr-1.5 mb-0.5 scale-110 cursor-auto text-custom-tealblue focus:ring-0 focus:ring-offset-0' onChange={e => setAsset({ ...asset, type: e.target.value })} required />
          <label htmlFor='stock-radio' className='mr-8 cursor-auto focus:bg-transparent'>
            Ações
          </label>
          <input id='cryptocurrency-radio' type='radio' name='type' value='cryptocurrency' className='mr-1.5 mb-0.5 scale-110 cursor-auto text-custom-tealblue focus:ring-0 focus:ring-offset-0' onChange={e => setAsset({ ...asset, type: e.target.value })} required />
          <label htmlFor='cryptocurrency-radio' className='cursor-auto'>
            Cryptomoedas
          </label>
        </div>
        <div>
          <p>Símbolo</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet focus:ring-2 focus:ring-custom-tealblue' value={ticker} onChange={e => setTicker(e.target.value)} required />
        </div>
        <div>
          <p>Nome</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet focus:ring-2 focus:ring-custom-tealblue' value={asset.name} onChange={e => setAsset({ ...asset, name: e.target.value })} required />
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
            <span>Adicionar</span>
            <GoPlus className='ml-1 mt-1 text-base' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewAssetPage
