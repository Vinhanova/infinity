import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import WalletPage from './pages/WalletPage'
import MainPage from './pages/MainPage'
import RootLayout from './pages/RootLayout'
import InvestmentsPage from './pages/InvestmentsPage'
import MealPlannerPage from './pages/MealPlannerPage'
import CalendarPage from './pages/CalendarPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<MainPage />} />
      <Route path='/calendar' element={<CalendarPage />} />
      <Route path='/meal-planner' element={<MealPlannerPage />} />
      <Route path='/wallet' element={<WalletPage />} />
      <Route path='/investments' element={<InvestmentsPage />} />
      <Route path='*' element={<h1>Error</h1>} />
    </Route>
  )
)

/* const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />
        //loader: teamLoader,
      },
      {
        path: 'wallet',
        element: <Wallet />
      },
      {
        path: '*',
        element: <h1>Error</h1>
      }
    ]
  }
]) */

const App = () => {
  return <RouterProvider router={router} />
}

export default App
