import { FC, ReactNode } from 'react'

type Props = {
  start: Array<ReactNode>
  end: Array<ReactNode>
}

const WalletNavBar: FC<Props> = ({ start, end }) => {
  return (
    <nav className='w-full border-b-2 border-white p-2.5 font-semibold'>
      <div className='ml-4 flex items-center justify-between'>
        <ul className='flex flex-row items-center space-x-6 text-sm'>
          {start.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className='flex flex-row items-center space-x-6 text-sm'>
          {end.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default WalletNavBar
