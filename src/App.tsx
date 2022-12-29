import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import WalletPage from './pages/WalletPage'
import MainPage from './pages/MainPage'
import AppLayout from './pages/AppLayout'
import InvestmentsPage from './pages/InvestmentsPage'
import MealPlannerPage from './pages/MealPlannerPage'
import CalendarPage from './pages/CalendarPage'
import MenuNavBar from './components/MenuNavBar'
import RecentPaymentsPage from './pages/RecentPaymentsPage'
import AllPaymentsPage from './pages/AllPaymentsPage'
import AddPaymentPage from './pages/AddPaymentPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<MainPage />} />
      <Route path='/calendar' element={<MenuNavBar />}>
        <Route index element={<CalendarPage />} />
      </Route>
      <Route path='/meal-planner' element={<MenuNavBar />}>
        <Route index element={<MealPlannerPage />} />
      </Route>
      <Route path='wallet' element={<MenuNavBar />}>
        <Route index element={<WalletPage />} />
        <Route path='recent-payments' element={<RecentPaymentsPage />} />
        <Route path='all-payments' element={<AllPaymentsPage />} />
        <Route path='add-payment' element={<AddPaymentPage />} />
      </Route>
      <Route path='/investments' element={<MenuNavBar />}>
        <Route index element={<InvestmentsPage />} />
      </Route>
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
