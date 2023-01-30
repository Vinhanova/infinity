import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../Context/AuthContext'
import GoogleButton from 'react-google-button'

const LoginPage: FC = () => {
  const { googleSignIn, user } = UserAuth()
  const navigate = useNavigate()
  //console.log('USER >>', user)

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
      // console.log('end')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      //console.log('Navigate')
      navigate('/')
    }
  }, [user])

  return (
    <>
      <div>LoginPage</div>
      <br />
      <GoogleButton onClick={handleGoogleSignIn} />
    </>
  )
}

export default LoginPage
