import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import WalletLayout from './layouts/WalletLayout'
import MealPlannerLayout from './layouts/MealPlannerLayout'
import CalendarLayout from './layouts/CalendarLayout'
import InvestmentsLayout from './layouts/InvestmentsLayout'
import MainPage from './pages/MainPages/MainPage'
import WalletPage from './pages/WalletPages/WalletPage'
import InvestmentsPage from './pages/InvestmentsPages/InvestmentsPage'
import MealPlannerPage from './pages/MealPlannerPages/MealPlannerPage'
import CalendarPage from './pages/CalendarPages/CalendarPage'
import RecentPaymentsPage from './pages/WalletPages/RecentPaymentsPage'
import AllPaymentsPage from './pages/WalletPages/AllPaymentsPage'
import AddPaymentPage from './pages/WalletPages/AddPaymentPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import InvestmentsPage2 from './pages/InvestmentsPages/InvestmentsPage2'

const Navigation = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='' element={<AppLayout />}>
        <Route path='login' element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route index element={<MainPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='calendar' element={<CalendarLayout />}>
            <Route index element={<CalendarPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='meal-planner' element={<MealPlannerLayout />}>
            <Route index element={<MealPlannerPage />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='wallet' element={<WalletLayout />}>
            <Route index element={<WalletPage />} />
            <Route path='recent-payments' element={<RecentPaymentsPage />} />
            <Route path='all-payments' element={<AllPaymentsPage />} />
            <Route path='add-payment' element={<AddPaymentPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='investments' element={<InvestmentsLayout />}>
            <Route index element={<div>InvestmentsPage</div>} />
            <Route path='test' element={<InvestmentsPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='profile' element={<ProfilePage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='settings' element={<SettingsPage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
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

  return <RouterProvider router={router} />
}

export default Navigation
