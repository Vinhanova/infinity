import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { useDocFirestore } from '../utils/useGetFirestore'
import { Request } from '../utils/types'
import { useUserAuth } from './AuthContext'
import _ from 'underscore'

type Props = {
  children: ReactNode
}

const WalletContext = createContext<any>({})

export const WalletContextProvider: FC<Props> = ({ children }) => {
  const { user } = useUserAuth()
  const [walletInfo, setWalletInfo] = useState<Request>({ state: 'pending' })

  const { state: walletInfoState, data: walletInfoData, error: walletInfoError } = useDocFirestore<any>(`wallets`, user.uid)

  useEffect(() => {
    setWalletInfo({ state: walletInfoState, data: walletInfoData, error: walletInfoError })
    console.log(walletInfoState, walletInfoData, walletInfoError)
  }, [walletInfoState])

  return <WalletContext.Provider value={{ walletInfo, setWalletInfo }}>{children}</WalletContext.Provider>
}

export const useWalletContext = () => {
  return useContext(WalletContext)
}
