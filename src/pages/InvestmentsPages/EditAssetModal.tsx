import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { useDraggHandler } from '../../utils/useDraggHandler'
import { useUserAuth } from '../../Context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { Asset } from '../../utils/types'
import { IoIosArrowDropright } from 'react-icons/io'
import { FC, useEffect, useState } from 'react'
import { db } from '../../firebase'
import { MdClose, MdEdit } from 'react-icons/md'
import _ from 'underscore'
import MainButton from './MainButton'

type Props = {
  setAddAssetModal: Function
}

const EditAssetModal: FC<Props> = ({ setAddAssetModal }) => {
  const { editAssetModal, closeEditAssetModal, oldAssetInfo } = useInvestmentsContext()
  const { borderPosition, mouseDownHandler } = useDraggHandler()
  const { user } = useUserAuth()
  const [editedSymbol, setEditedSymbol] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<{ symbol: string; name: string }>({
    symbol: 'Anterior: (A carregar...)',
    name: 'Anterior: (A carregar...)'
  })

  const [editedAsset, setEditedAsset] = useState<Asset>({
    name: '(A carregar...)',
    quantity: 1,
    type: 'stock',
    state: 'purchased'
  })

  useEffect(() => {
    if (_.isEmpty(oldAssetInfo)) return

    setEditedSymbol(oldAssetInfo.symbol)
    setEditedAsset({
      name: oldAssetInfo.name,
      quantity: oldAssetInfo.quantity,
      type: oldAssetInfo.type,
      state: oldAssetInfo.state
    })
    setPlaceholder({
      symbol: 'Anterior: ' + oldAssetInfo.symbol,
      name: 'Anterior: ' + oldAssetInfo.name
    })
  }, [oldAssetInfo])

  const editAsset = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await setDoc(doc(db, 'stocks', user.uid), { [editedSymbol]: editedAsset }, { merge: true })
      .then(res => {
        window.location.reload()
      })
      .catch(err => alert(err))
  }

  useEffect(() => {
    if (editAssetModal) setAddAssetModal(false)
  }, [editAssetModal])

  return (
    <div className={editAssetModal ? 'custom-gradient fixed min-h-full min-w-full md:static md:flex md:min-w-min md:bg-custom-dark-jet' : 'hidden'}>
      <div className='hidden cursor-col-resize select-none border-l-2 border-custom-tealblue-hl pl-1 hover:border-custom-tealblue md:block' style={{ width: '2px' }} onMouseDown={mouseDownHandler}></div>
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
            closeEditAssetModal()
          }}
        >
          <MdClose className='md:hidden' />
          <IoIosArrowDropright className='hidden rounded-full bg-custom-dark-jet hover:text-custom-tealblue-hl md:block' />
        </div>
        <form className='mt-6 flex flex-col gap-4 text-left [&_p]:mb-1' onSubmit={editAsset}>
          <div>
            <p>Tipo:</p>
            <input checked={editedAsset.type === 'stock'} id='edit-stock-radio' type='radio' name='type' value='stock' className='mr-1.5 mb-0.5 scale-110 cursor-pointer text-custom-tealblue-hl/80 focus:ring-0 focus:ring-offset-0' onChange={e => setEditedAsset({ ...editedAsset, type: e.target.value } as typeof editedAsset)} required />
            <label htmlFor='edit-stock-radio' className='mr-8 cursor-pointer focus:bg-transparent'>
              Ações
            </label>

            <input checked={editedAsset.type === 'cryptocurrency'} id='edit-cryptocurrency-radio' type='radio' name='type' value='cryptocurrency' className='mr-1.5 mb-0.5 scale-110 cursor-pointer text-custom-tealblue-hl/80 focus:ring-0 focus:ring-offset-0' onChange={e => setEditedAsset({ ...editedAsset, type: e.target.value } as typeof editedAsset)} required />
            <label htmlFor='edit-cryptocurrency-radio' className='cursor-pointer'>
              Criptomoedas
            </label>
          </div>
          <div>
            <p>Símbolo</p>
            <input className='w-full rounded py-1 px-2 text-sm uppercase text-custom-jet placeholder:normal-case placeholder:opacity-60 focus:ring-2 focus:ring-custom-tealblue lg:text-base' placeholder={placeholder.symbol} value={editedSymbol} onChange={e => setEditedSymbol(e.target.value.toUpperCase())} required />
          </div>
          <div>
            <p>Nome</p>
            <input className='w-full rounded py-1 px-2 text-sm text-custom-jet placeholder:opacity-60 focus:ring-2 focus:ring-custom-tealblue lg:text-base' placeholder={placeholder.name} value={editedAsset.name} onChange={e => setEditedAsset({ ...editedAsset, name: e.target.value })} required />
          </div>
          <div>
            <p>Quantidade</p>
            <input className='w-full rounded py-1 px-2 text-sm text-custom-jet focus:ring-2 focus:ring-custom-tealblue lg:text-base' value={editedAsset.quantity} type='number' onChange={e => setEditedAsset({ ...editedAsset, quantity: +e.target.value })} inputMode='numeric' min={editedAsset.type === 'stock' ? 1 : 0.000000001} step={editedAsset.type === 'stock' ? 1 : 0.000000001} required />
          </div>
          {/* <div>
          <p>Watchlist</p>
        </div> */}
          <div className='mb-12 flex w-full justify-center text-center sm:mt-4'>
            <MainButton
              type='submit'
              content={
                <>
                  <span>Editar</span>
                  <MdEdit className='ml-1 mt-[5px] text-sm' />
                </>
              }
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAssetModal
