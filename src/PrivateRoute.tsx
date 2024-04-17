import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import { FC } from 'react'

const PrivateRoute: FC = () => {
  const [user, loading, error] = useAuthState(auth)

  if (loading)
    return (
      <div className='flex flex-col items-center'>
        <div className='mt-4 text-center lg:mt-8'>
          <h1>A carregar...</h1>
        </div>
      </div>
    )

  if (error) return <div>Error</div>

  if (user) return <Outlet />

  return <Navigate to='/' />
}

export default PrivateRoute
