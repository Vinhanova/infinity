import { FC, ReactNode } from 'react'

type Props = {
  start: ReactNode[]
  end: ReactNode[]
}

const WalletNavBar: FC<Props> = ({ start, end }) => {
  return (
    <nav className='sticky inset-x-0 top-0 z-20 h-14 border-b-2 border-custom-tealblue-hl bg-custom-jet p-2.5 font-semibold'>
      <div className='flex items-center justify-between sm:ml-4'>
        <ul className='flex flex-row items-center space-x-4 text-sm xs:space-x-6'>
          {start.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className='flex flex-row items-center space-x-4 text-sm xs:space-x-6'>
          {end.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default WalletNavBar
