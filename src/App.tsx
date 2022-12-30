import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import WalletNavBar from './layouts/WalletNavBar'
import AppLayout from './layouts/AppLayout'
import WalletPage from './pages/Wallet/WalletPage'
import MainPage from './pages/Main/MainPage'
import InvestmentsPage from './pages/Investments/InvestmentsPage'
import MealPlannerPage from './pages/MealPlanner/MealPlannerPage'
import CalendarPage from './pages/Calendar/CalendarPage'
import RecentPaymentsPage from './pages/Wallet/RecentPaymentsPage'
import AllPaymentsPage from './pages/Wallet/AllPaymentsPage'
import AddPaymentPage from './pages/Wallet/AddPaymentPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<MainPage />} />
      <Route path='/calendar' element={<WalletNavBar />}>
        <Route index element={<CalendarPage />} />
      </Route>
      <Route path='/meal-planner' element={<WalletNavBar />}>
        <Route index element={<MealPlannerPage />} />
      </Route>
      <Route path='wallet' element={<WalletNavBar />}>
        <Route index element={<WalletPage />} />
        <Route path='recent-payments' element={<RecentPaymentsPage />} />
        <Route path='all-payments' element={<AllPaymentsPage />} />
        <Route path='add-payment' element={<AddPaymentPage />} />
      </Route>
      <Route path='/investments' element={<WalletNavBar />}>
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
