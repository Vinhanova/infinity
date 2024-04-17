import { FC, MouseEventHandler, ReactNode } from 'react'

type Props = {
  content: ReactNode
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const MainButton: FC<Props> = ({ content, type, className, onClick }) => (
  <button //
    id='submenu-link'
    type={type || 'button'}
    className={'flex rounded-[0.15rem] border-2 border-custom-tealblue-hl py-1.5 px-3 ' + className}
    onClick={onClick}
  >
    {content}
  </button>
)

export default MainButton
