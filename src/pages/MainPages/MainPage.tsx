import { FC } from 'react'
import { UserAuth } from '../../Context/AuthContext'

const MainPage: FC = () => {
  const { logOut, user } = UserAuth()

  return (
    <>
      <div>MainPage</div>
      {user && <a onClick={logOut}>LOGOUT</a>}
    </>
  )
}

export default MainPage
