import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import WalletPage from './pages/WalletPages/WalletPage'
import MainPage from './pages/MainPages/MainPage'
import InvestmentsPage from './pages/InvestmentsPages/InvestmentsPage'
import MealPlannerPage from './pages/MealPlannerPages/MealPlannerPage'
import CalendarPage from './pages/CalendarPages/CalendarPage'
import RecentPaymentsPage from './pages/WalletPages/RecentPaymentsPage'
import AllPaymentsPage from './pages/WalletPages/AllPaymentsPage'
import AddPaymentPage from './pages/WalletPages/AddPaymentPage'
import WalletLayout from './layouts/WalletLayout'
import MealPlannerLayout from './layouts/MealPlannerLayout'
import CalendarLayout from './layouts/CalendarLayout'
import InvestmentsLayout from './layouts/InvestmentsLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<MainPage />} />
      <Route path='/calendar' element={<CalendarLayout />}>
        <Route index element={<CalendarPage />} />
      </Route>
      <Route path='/meal-planner' element={<MealPlannerLayout />}>
        <Route index element={<MealPlannerPage />} />
      </Route>
      <Route path='wallet' element={<WalletLayout />}>
        <Route index element={<WalletPage />} />
        <Route path='recent-payments' element={<RecentPaymentsPage />} />
        <Route path='all-payments' element={<AllPaymentsPage />} />
        <Route path='add-payment' element={<AddPaymentPage />} />
      </Route>
      <Route path='/investments' element={<InvestmentsLayout />}>
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
