import { AuthContextProvider } from './Context/AuthContext'
import { FC } from 'react'
import Navigation from './Navigation'

const App: FC = () => {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  )
}

export default App
