import React, {FC} from 'react'
import Burger from './../UI/Burger'
import Searchbar from './../UI/Searchbar'
import User from '../Modals/User'
import useTypedSelector from '../../hooks/useTypedSelector'
import { RootState } from '../../store/store'

interface HeaderProps {
  setInfoVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header:FC<HeaderProps> = ({ setInfoVisibility }) => {
  const user = useTypedSelector((state: RootState) => state.user.user)
  return (
    <header className='header'>
        <div className="header__left">
          <Burger />
          <img className='header__logo' src='assets/images/logo.svg' alt='logo'></img>
        </div>
        <Searchbar />
        <div className="header__right">
          <button onClick={e => {e.preventDefault(); e.stopPropagation(); setInfoVisibility(prev => !prev)}}>
            <img src={user?.photo || 'assets/images/user.png'} alt='avatar'></img>
          </button>
          <User />
        </div>
    </header>
  )
}

export default Header