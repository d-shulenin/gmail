import { FC, useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DeleteIcon from '@mui/icons-material/Delete';
import { IEmail } from '../../interfaces';
import { db } from '../../firebase/firebase'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Item:FC<IEmail> = ({id, author, subject, text, date, read, starred, snoozed, spam, trash}) => {
  const navigate = useNavigate()
  const [starredState, setStarredState] = useState<boolean>(starred)
  const [snoozedState, setSnoozedState] = useState<boolean>(snoozed)
  const [spamState, setSpamState] = useState<boolean>(spam)
  const [trashState, setTrashState] = useState<boolean>(trash)
  const states = {'starred': starredState, 'snoozed': snoozedState, 'spam': spamState, 'trash': trashState}
  async function updateEmail() {
    const email = await getDoc(doc(db, "emails", `${id}`))
    await updateDoc(doc(db, "emails", `${id}`), {

    });
  }
  useEffect(() => {
    updateEmail()
  }, [starredState, snoozedState, spamState, trashState])
  return (
    <div className='item' onClick={() => navigate(`${id}`)}>
        <div className="item__left-buttons">
            <input type="checkbox" onClick={e => e.stopPropagation()}/>
            <button><StarIcon /></button>
        </div>
        <h4 className={read ? 'item__author read' : 'item__author'}>{author}</h4>
        <p className={read ? 'item__content read' : 'item__content'}>{subject}<span>{` - ${text}`}</span></p>
        <span className='item__date'>{date}</span>
        <div className="item__right-buttons">
            <button><AccessTimeFilledIcon /></button>
            <button><DeleteIcon /></button>
        </div>
    </div>
  )
}

export default Item