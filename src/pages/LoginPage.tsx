import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../Context/AuthContext'
import GoogleButton from 'react-google-button'
import { IoInfiniteSharp } from 'react-icons/io5'

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
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <IoInfiniteSharp className='mb-20 text-9xl' />
        <GoogleButton onClick={handleGoogleSignIn} className='mb-10' />
      </div>
    </>
  )
}

export default LoginPage
