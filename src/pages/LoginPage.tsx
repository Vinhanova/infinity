import { FaChevronRight, FaLinkedin, FaChevronLeft, FaReact } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiNetlify } from 'react-icons/si'
import { IoInfiniteSharp, IoLogoFirebase } from 'react-icons/io5'
import { FaChartPie, FaFolderTree } from 'react-icons/fa6'
import { useUserAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import { MdAccessTime } from 'react-icons/md'
import { Carousel } from 'flowbite-react'
import { FC, useEffect, useRef } from 'react'

const LoginPage: FC = () => {
  const { googleSignIn, user } = useUserAuth()
  const navigate = useNavigate()
  const ref = useRef<any>()
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
      <div className='flex min-h-screen flex-col items-center justify-items-center'>
        <div className='mt-4 flex w-full flex-col-reverse justify-center sm:flex-row sm:items-center sm:px-8 md:px-16 portrait:min-h-[40vh] landscape:min-h-[65vh]'>
          <div className='flex h-full flex-col justify-items-center gap-y-4 p-4 text-center sm:m-0 sm:w-7/12 sm:p-0 sm:text-start lg:w-5/12 lg:pl-4 xl:pl-12 2xl:pl-24'>
            <h1 className='font-mono text-2xl sm:text-[1.7rem] lg:text-3xl xl:text-4xl 2xl:text-5xl'>
              Projeto <IoInfiniteSharp className='mb-1 inline text-3xl sm:mb-2 sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl' /> Infinity
            </h1>
            <div>
              <h2 className='break-words text-sm lg:text-base xl:text-[18px]'>
                Aplicação para gestão de investimentos
                <br />
                Desenvolvido por{' '}
                <a href='https://www.linkedin.com/in/tiagovinhanova/' target='_blank' rel='noreferrer noopener' className='whitespace-nowrap text-custom-tealblue-hl underline underline-offset-4'>
                  Tiago Vinhanova
                  <FaLinkedin className='ml-2 inline text-custom-tealblue-hl' />
                </a>
              </h2>
            </div>
            <h4
              className='cursor-pointer text-xs italic underline underline-offset-4 lg:text-sm'
              onClick={() =>
                window.scrollTo({
                  top: ref.current.offsetTop,
                  behavior: 'smooth'
                })
              }
            >
              Tecnologias utilizadas
            </h4>
            <GoogleButton className='mt-2 !w-[280px] scale-90 self-center !rounded !bg-custom-tealblue hover:!bg-custom-tealblue-hl/75 hover:!shadow-none focus:!appearance-none focus:!bg-custom-tealblue xs:mt-4 sm:scale-100 sm:self-start md:mt-6 lg:mt-8' type='dark' label='Fazer login com o Google' onClick={handleGoogleSignIn} />
          </div>
          <div className='-mt-4 sm:-mt-12 sm:w-7/12'>
            <img src='../mockups.png' alt='Infinity App Phone, Tablet and PC Mockups with example data' />
          </div>
        </div>
        <div
          className='grid min-h-[65vh] w-full grid-cols-1 grid-rows-3 items-start justify-items-start gap-y-8 overflow-hidden bg-custom-dark-jet p-8 sm:min-h-[40vh] md:px-16
          lg:h-[40vh] lg:min-h-[0vh] lg:grid-cols-3 lg:grid-rows-1 lg:items-center lg:justify-items-center lg:p-0 lg:px-16'
        >
          <div className='space-y-4 lg:mx-4 xl:mx-12 2xl:mx-20'>
            <FaFolderTree className='h-[30px] w-auto sm:text-2xl xl:text-3xl' />
            <h4 className='text-base lg:text-lg xl:text-xl'>Tudo na mesma aplicação</h4>
            <h5 className='whitespace-normal text-sm font-light xl:text-base'>Adicione múltiplas categorias de ativos no mesmo Portfólio, como Ações e Criptomoedas</h5>
          </div>
          <div className='space-y-4 lg:mx-4 xl:mx-12 2xl:mx-20'>
            <MdAccessTime className='-ml-1 h-[30px] w-auto scale-110 text-xl sm:text-3xl xl:text-4xl' />
            <h4 className='text-base lg:text-lg xl:text-xl'>Atualizado em tempo real</h4>
            <h5 className='whitespace-normal text-sm font-light xl:text-base'>Acompanhe o valor de Ações e Criptomoedas atualizado ao segundo</h5>
          </div>
          <div className='space-y-4 lg:mx-4 xl:mx-12 2xl:mx-20'>
            <FaChartPie className='-ml-0.5 h-[30px] w-auto text-xl sm:text-2xl xl:text-3xl' />
            <h4 className='text-base lg:text-lg xl:text-xl'>Estatísticas</h4>
            <h5 className='whitespace-normal text-sm font-light xl:text-base'>Veja visualmente a distribuição do seu Portfólio nas diferentes categorias: Ações vs Criptomoedas</h5>
          </div>
        </div>
        <div className='flex w-full justify-center p-8 portrait:h-[30vh] landscape:h-[40vh]'>
          <Carousel pauseOnHover className='h-full w-full justify-center xs:w-8/12 md:w-6/12 2xl:w-4/12' leftControl={<FaChevronLeft className='relative -left-10 text-2xl sm:-left-20' />} rightControl={<FaChevronRight className='relative -right-10 text-2xl sm:-right-20' />}>
            <img className='lg:w-10/12' src='../crypto-vs-stocks-piechart.png' alt='All Assets and Crypto vs Stocks PieCharts Example' />
            <img src='../new-asset.png' alt='New Asset Page Example' />
            <img className='lg:w-10/12' src='../crypto-stocks-piechart.png' alt='Stocks and Crypto PieCharts Example' />
            <img src='../list.png' alt='List of all Assets with 24h percent change Example' />
          </Carousel>
        </div>
        <div ref={ref} className='flex w-full flex-col items-center justify-center space-y-6 bg-custom-dark-jet py-8 xs:h-[25vh] xs:py-0'>
          <h3 className='text-base lg:text-lg xl:text-xl'>Tecnologias utilizadas</h3>
          <div className='flex w-10/12 flex-col justify-between space-y-8 text-7xl xs:w-11/12 xs:flex-row xs:space-y-0 sm:w-10/12 md:w-9/12 lg:w-7/12 2xl:w-6/12 3xl:w-6/12 [&_h6]:text-base'>
            <div className='flex flex-col items-center justify-center space-y-2'>
              <SiTypescript />
              <h6>TypeScript</h6>
            </div>
            <div className='flex flex-col items-center justify-center space-y-2'>
              <FaReact />
              <h6>React</h6>
            </div>
            <div className='flex flex-col items-center justify-center space-y-2'>
              <SiTailwindcss />
              <h6>TailwindCSS</h6>
            </div>
            <div className='flex flex-col items-center justify-center space-y-2'>
              <IoLogoFirebase />
              <h6>Firebase</h6>
            </div>
            <div className='flex flex-col items-center justify-center space-y-2'>
              <SiNetlify />
              <h6>Netlify</h6>
            </div>
          </div>
        </div>
        <div className='mx-12 flex h-[10vh] w-full items-center justify-center text-sm sm:text-base'>
          <h5>
            Desenvolvido por{' '}
            <a href='https://www.linkedin.com/in/tiagovinhanova/' target='_blank' rel='noreferrer noopener' className='whitespace-nowrap text-custom-tealblue-hl underline underline-offset-4'>
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
