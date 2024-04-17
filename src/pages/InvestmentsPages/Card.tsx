import { FC, ReactNode } from 'react'

type Props = {
  content: ReactNode
}

const Card: FC<Props> = ({ content }) => {
  return <div className='rounded-lg bg-custom-dark-jet p-4'>{content}</div>
}

export default Card
