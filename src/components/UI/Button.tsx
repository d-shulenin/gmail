import React, {FC} from 'react'

interface ButtonProps {
  handler?: any;
  children: String;
  disabled?: boolean;
} 

const Button:FC<ButtonProps> = ({handler, children, disabled}) => {
  return (
    <button className='button' onClick={handler} disabled={disabled}>{children}</button>
  )
}

export default Button