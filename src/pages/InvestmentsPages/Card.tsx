import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const Card: FC<Props> = ({ children, className }) => {
  return <div className={'rounded-lg bg-custom-dark-jet p-4 ' + className}>{children}</div>
}

export default Card
