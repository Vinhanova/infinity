import { Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from './Context/AuthContext'

type Props = {}

const PrivateRoute = (props: Props) => {
  let { user } = UserAuth() // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return user ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
