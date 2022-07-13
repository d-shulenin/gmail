import {FC, MouseEventHandler, useContext} from 'react'
import Button from '../UI/Button'
import { rename, changePhoto, logout } from '../../store/slices/userSlice'
import useTypedSelector from '../../hooks/useTypedSelector'
import { RootState } from '../../store/store'
import { useDispatch } from 'react-redux'
import { signOut } from "firebase/auth"
import { auth } from '../../firebase/firebase'
import { Context } from '../../App'

const User:FC = () => {
  const dispatch = useDispatch()
  const user = useTypedSelector((state: RootState) => state.user.user)
  const { infoVisibility, setInfoVisibility } = useContext(Context)
  function changePhotoHandler():void {
    const URL = prompt('Enter image URL')
    if (URL) dispatch(changePhoto(URL))
  }
  const logoutHandler:MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      dispatch(logout())
      setInfoVisibility(false)
    })
  }
  return (
    <div className='user' style={{display: infoVisibility ? 'flex' : 'none'}} onClick={e => e.stopPropagation()}>
        <button className='user__photo' onClick={changePhotoHandler}><img src={user?.photo || 'assets/images/user.png'} alt='user'></img></button>
        <input type='text' value={user?.name || ''} onChange={e => dispatch(rename(e.target.value))}></input>
        <span>{user?.email}</span>
        <hr></hr>
        <Button handler={logoutHandler}>Logout</Button>
    </div>
  )
}

export default User