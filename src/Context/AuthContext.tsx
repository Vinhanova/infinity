import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithPopup, signInAnonymously } from 'firebase/auth'
import { useContext, createContext, useEffect, useState, FC, ReactNode } from 'react'
import { Auth } from '../utils/types'
import { auth } from '../firebase'

type Props = {
  children: ReactNode
}

const AuthContext = createContext<Auth>({})

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState({})

  const anonSignIn = async () => {
    await signInAnonymously(auth)
      .then(() => {
        // Signed in..
        console.log('log in')
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error)
        // ...
      })
  }

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
    // await signInWithRedirect(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser!)
      // console.log('USER UPDATE >>', currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ anonSignIn, googleSignIn, logOut, user }}>{children}</AuthContext.Provider>
}

export const useUserAuth = () => {
  return useContext(AuthContext)
}
