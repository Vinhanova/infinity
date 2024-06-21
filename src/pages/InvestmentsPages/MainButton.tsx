import { FC, MouseEventHandler, ReactNode } from 'react'

type Props = {
  content: ReactNode
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const MainButton: FC<Props> = ({ content, type, className, onClick }) => (
  <button //
    id='main-button'
    type={type || 'button'}
    className={'flex justify-center rounded-[0.15rem] border-2 border-custom-tealblue-hl px-3 py-1.5 ' + className}
    onClick={onClick}
  >
    {content}
  </button>
)

export default MainButton
