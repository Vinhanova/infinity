import { useContext, createContext, useEffect, useState, FC, ReactNode } from 'react'
import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { auth } from '../firebase'

type test = {
  googleSignIn?: any
  logOut?: any
  user?: any
}

const AuthContext = createContext<test>({})

type Props = {
  children: ReactNode
}

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState({})

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    // await signInWithPopup(auth, provider)
    await signInWithRedirect(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser!)
      console.log('USER UPDATE >>', currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ googleSignIn, logOut, user }}>{children}</AuthContext.Provider>
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
