import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../Context/AuthContext'
import GoogleButton from 'react-google-button'
import { IoInfiniteSharp } from 'react-icons/io5'
import { FaChartPie, FaFolderTree } from 'react-icons/fa6'
import { MdAccessTime } from 'react-icons/md'

const LoginPage: FC = () => {
  const { googleSignIn, user } = useUserAuth()
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
      <div className='flex min-h-screen flex-col items-center justify-items-center font-mono'>
        <div className='flex min-h-[60vh] w-full flex-col-reverse justify-center pl-4 sm:flex-row sm:items-center sm:p-0 sm:px-16'>
          <div className='mt-6 flex h-full flex-col justify-items-center gap-y-6 text-center sm:m-0 sm:w-5/12 sm:pl-24 sm:text-start'>
            <h1 className='text-xl sm:text-5xl'>
              Projeto <IoInfiniteSharp className='mb-1 inline text-3xl sm:mb-2 sm:text-5xl' /> Infinity
            </h1>
            <h3 className='break-words text-sm sm:text-base'>
              Aplicação para gestão de investimentos
              <br />
              Desenvolvido por{' '}
              <a href='https://www.linkedin.com/in/tiagovinhanova/' target='_blank' rel='noreferrer noopener' className='text-custom-tealblue-hl underline underline-offset-4'>
                Tiago Vinhanova
              </a>
            </h3>
            <GoogleButton onClick={handleGoogleSignIn} className='scale-75 self-center sm:scale-100 sm:self-start' />
          </div>
          <div className='-mt-12 sm:w-7/12'>
            <img src='public/mockups.png' alt='Infinity App Phone, Tablet and PC Mockups' />
          </div>
        </div>
        <div
          className='grid min-h-[65vh] w-full grid-cols-1 grid-rows-3 items-start justify-items-center gap-y-8 bg-[#1d1e20] p-8
          sm:mx-12 sm:h-[40vh] sm:min-h-[0vh] sm:grid-cols-3 sm:grid-rows-1 sm:items-center sm:gap-y-8 sm:p-0
          [&_div]:h-[20vh] [&_div]:space-y-4 [&_h4]:sm:text-xl [&_div]:lg:mx-12
          [&_div]:xl:mx-20 [&_h4]:text-base
          [&_h5]:whitespace-normal [&_h5]:text-sm [&_h5]:font-light [&_h5]:sm:text-base'
        >
          <div>
            <FaFolderTree className='sm:text-3xl' />
            <h4>Tudo na mesma aplicação</h4>
            <h5>Adicione múltiplos tipos de ativos no mesmo portfólio, como ações e criptomoedas</h5>
          </div>
          <div>
            <MdAccessTime className='-ml-1 text-xl sm:text-4xl' />
            <h4>Atualizado em tempo real</h4>
            <h5>Valor de Ações e Criptomoedas atualizado ao segundo</h5>
          </div>
          <div>
            <FaChartPie className='-ml-0.5 text-xl sm:text-3xl' />
            <h4>Estatísticas</h4>
            <h5>Gráficos representativos da distribuição do seu portfólio</h5>
          </div>
        </div>
        <div className='mx-12 h-[50vh] w-full'>2</div>
        <div className='mx-12 h-[10vh] w-full bg-[#1d1e20]'>3</div>
      </div>
    </>
  )
}

export default LoginPage
