import { useContext, createContext, useEffect, useState, FC, ReactNode } from 'react'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, User, IdTokenResult } from 'firebase/auth'
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

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser!)
      console.log('User', currentUser)
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
