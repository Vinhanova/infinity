import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import { FC } from 'react'

const PrivateRoute: FC = () => {
  const [user, loading, error] = useAuthState(auth)

  if (loading) return <div>Loading</div>

  if (error) return <div>Error</div>

  if (user) return <Outlet />

  return <Navigate to='/login' />
}

export default PrivateRoute
