import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../Context/AuthContext'
import GoogleButton from 'react-google-button'
import { IoInfiniteSharp } from 'react-icons/io5'
import { FaChartPie, FaFolderTree } from 'react-icons/fa6'
import { MdAccessTime } from 'react-icons/md'
import { FaChevronRight, FaLinkedin } from 'react-icons/fa'
import { Carousel } from 'flowbite-react'
import { FaChevronLeft } from 'react-icons/fa'

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
        <div className='mt-4 flex min-h-[60vh] w-full flex-col-reverse justify-center sm:flex-row sm:items-center sm:px-16'>
          <div className='flex h-full flex-col justify-items-center gap-y-6 p-4 text-center sm:m-0 sm:w-5/12 sm:p-0 sm:text-start lg:pl-4 xl:pl-24'>
            <h1 className='text-2xl sm:text-5xl'>
              Projeto <IoInfiniteSharp className='mb-1 inline text-3xl sm:mb-2 sm:text-5xl' /> Infinity
            </h1>
            <h3 className='break-words text-sm sm:text-base'>
              Aplicação para gestão de investimentos
              <br />
              Desenvolvido por{' '}
              <a href='https://www.linkedin.com/in/tiagovinhanova/' target='_blank' rel='noreferrer noopener' className='text-custom-tealblue-hl underline underline-offset-4'>
                Tiago Vinhanova
                <FaLinkedin className='ml-2 inline text-custom-tealblue-hl' />
              </a>
            </h3>
            <GoogleButton onClick={handleGoogleSignIn} className='scale-90 self-center sm:scale-100 sm:self-start' />
          </div>
          <div className='-mt-4 sm:-mt-12 sm:w-7/12'>
            <img src='../mockups.png' alt='Infinity App Phone, Tablet and PC Mockups' />
          </div>
        </div>
        <div
          className='grid min-h-[65vh] w-full grid-cols-1 grid-rows-3 items-start justify-items-center gap-y-2 bg-[#1d1e20] p-8
          sm:h-[40vh] sm:min-h-[0vh] sm:grid-cols-3 sm:grid-rows-1 sm:items-center sm:gap-y-8 sm:p-0 sm:px-16'
        >
          <div className='h-[20vh] space-y-4 lg:mx-4 xl:mx-20'>
            <FaFolderTree className='min-w-auto min-h-[30px] sm:text-2xl xl:text-3xl' />
            <h4 className='text-base sm:text-lg xl:text-xl'>Tudo na mesma aplicação</h4>
            <h5 className='whitespace-normal text-sm font-light xl:text-base'>Adicione múltiplos tipos de ativos no mesmo Portfólio, como Ações e Criptomoedas</h5>
          </div>
          <div className='h-[20vh] space-y-4 lg:mx-4 xl:mx-20'>
            <MdAccessTime className='min-w-auto -ml-1 min-h-[30px] text-xl sm:text-3xl xl:text-4xl' />
            <h4 className='text-base sm:text-lg xl:text-xl'>Atualizado em tempo real</h4>
            <h5 className='whitespace-normal text-sm font-light xl:text-base'>Valor de Ações e Criptomoedas atualizado ao segundo</h5>
          </div>
          <div className='h-[20vh] space-y-4 lg:mx-4 xl:mx-20'>
            <FaChartPie className='min-w-auto -ml-0.5 min-h-[30px] text-xl sm:text-2xl xl:text-3xl' />
            <h4 className='text-base sm:text-lg xl:text-xl'>Estatísticas</h4>
            <h5 className='whitespace-normal text-sm font-light xl:text-base'>Gráficos representativos da distribuição do seu Portfólio</h5>
          </div>
        </div>
        <div className='my-8 flex h-[40vh] w-full justify-center'>
          <Carousel pauseOnHover className='relative h-full w-full justify-center xs:w-8/12 sm:w-6/12 2xl:w-4/12' leftControl={<FaChevronLeft className='absolute -left-12 text-2xl text-custom-tealblue-hl' />} rightControl={<FaChevronRight className='absolute -right-12 text-2xl text-custom-tealblue-hl' />}>
            <img src='../crypto-vs-stocks-piechart.png' alt='...' />
            <img src='../new-asset.png' alt='...' />
            <img src='../crypto-stocks-piechart.png' alt='...' />
            <img src='../list.png' alt='...' />
          </Carousel>
        </div>
        <div className='mx-12 flex h-[10vh] w-full items-center justify-center bg-[#1d1e20] text-sm sm:text-base'>
          <h5>
            Desenvolvido por{' '}
            <a href='https://www.linkedin.com/in/tiagovinhanova/' target='_blank' rel='noreferrer noopener' className='text-custom-tealblue-hl underline underline-offset-4'>
              Tiago Vinhanova
              <FaLinkedin className='ml-2 inline text-custom-tealblue-hl' />
            </a>
          </h5>
        </div>
      </div>
    </>
  )
}

export default LoginPage
