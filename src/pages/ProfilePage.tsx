import { UserAuth } from '../Context/AuthContext'
import { FC } from 'react'

const ProfilePage: FC = () => {
  const { logOut, user } = UserAuth()

  return (
    <>
      <div>Profile</div>
      {user && <a onClick={logOut}>LOGOUT</a>}
    </>
  )
}

export default ProfilePage
