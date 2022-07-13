import {FC, useContext} from 'react'
import Link from '../UI/Link' 
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SendIcon from '@mui/icons-material/Send';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';
import { Context } from '../../App';

const links = [
    {id: 1, text: 'Inbox', icon: <InboxIcon />, number: 0},
    {id: 2, text: 'Starred', icon: <StarIcon />, number: 0},
    {id: 3, text: 'Snoozed', icon: <AccessTimeFilledIcon />, number: 0},
    {id: 4, text: 'Sent', icon: <SendIcon />, number: 0},
    {id: 6, text: 'Spam', icon: <ErrorIcon />, number: 0},
    {id: 7, text: 'Trash', icon: <DeleteIcon />, number: 0},
]

const Sidebar:FC = () => {
  const {setComposeVisibility} = useContext(Context)
  return (
    <aside className='sidebar'>
        <button onClick={e=> {e.preventDefault(); setComposeVisibility(true)}} className="sidebar__compose-button">
            <img src='assets/images/compose.svg' alt='compose'></img>
            <h3>Compose</h3>
        </button>
        <ul className="sidebar__links">
            {links.map(link => <Link key={link.id} text={link.text} icon={link.icon} number={link.number}/>)}
        </ul>
    </aside>
  )
}

export default Sidebar