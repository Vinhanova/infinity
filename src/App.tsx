import Wallet from './pages/Wallet'
import MainPage from './pages/MainPage'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<MainPage />} />
      <Route path='/wallet' element={<Wallet />} />
      <Route path='*' element={<h1>Error</h1>} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
