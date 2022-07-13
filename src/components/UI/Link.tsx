import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import { useLocation } from 'react-router-dom'

interface LinkProps {
    text: string;
    icon: any;
    number: number;
}

const Link:FC<LinkProps> = ({text, icon, number}) => {
  const location = useLocation()
  return (
    <NavLink className={location.pathname === text.toLowerCase() ? 'link active' : 'link'} to={text.toLowerCase()}>
        <div>
            {icon}
            <h3 style={{fontWeight: number === 0 ? '400' : '700'}}>{text}</h3> 
        </div>
        <span>{number === 0 ? null : number}</span>
    </NavLink>
  )
}

export default Link