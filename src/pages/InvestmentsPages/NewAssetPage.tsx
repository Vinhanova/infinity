import { UserAuth } from '../../Context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { userStock } from '../../utils/types'
import { FC, useState } from 'react'
import { db } from '../../firebase'

const NewAssetPage: FC = () => {
  const navigate = useNavigate()
  const { user } = UserAuth()
  const [ticker, setTicker] = useState<string>('')

  const [asset, setAsset] = useState<userStock>({
    name: '',
    quantity: 0,
    watchlist: false
  })

  async function createAsset(e: { preventDefault: () => void }) {
    e.preventDefault()
    await setDoc(doc(db, 'stocks', user.uid), { [ticker.toUpperCase()]: asset }, { merge: true })
      .then(res => navigate('/investments/portfolio'))
      .catch(err => alert(err))
  }

  return (
    <div className='my-8 flex flex-col items-center justify-center text-center sm:m-12'>
      <form className='flex w-8/12 flex-col gap-2 text-left md:w-6/12 lg:w-4/12 [&_p]:mb-1' onSubmit={createAsset}>
        {/* <div>
          <p>Type </p>
          <label className='mr-4'>
            <input type='radio' name='myRadio' value='option1' />
            Stock
          </label>
          <label>
            <input type='radio' name='myRadio' value='option2' />
            Crypto
          </label>
        </div> */}
        <div>
          <p>Ticker</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet  outline-custom-tealblue' value={ticker} onChange={e => setTicker(e.target.value)} required />
        </div>
        <div>
          <p>Name</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet outline-custom-tealblue' value={asset.name} onChange={e => setAsset({ ...asset, name: e.target.value })} required />
        </div>
        <div>
          <p>Quantity</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet outline-custom-tealblue' value={asset.quantity} type='number' onChange={e => setAsset({ ...asset, quantity: +e.target.value })} required />
        </div>
        {/* <div>
          <p>Watchlist</p>
        </div> */}
        <br />
        <div className='flex w-full justify-center text-center'>
          <button type='submit' className='rounded border-2 px-4 py-2'>
            Add new Asset
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewAssetPage
