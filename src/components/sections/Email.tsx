import { FC, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';    
import ReplyIcon from '@mui/icons-material/Reply';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { doc, getDoc, DocumentData, updateDoc } from "firebase/firestore";
import { db } from './../../firebase/firebase'

const Email:FC = () => {
  const [email, setEmail] = useState<DocumentData>() 
  const params = useParams()
  const navigate = useNavigate()
  async function getEmail() {
    const docRef = doc(db, "emails", `${params.id}`);
    const responce = await getDoc(docRef)
    return responce.data()
  }
  useEffect(() => {
    getEmail().then(responce => setEmail(responce))
    if (email?.read === false) updateDoc(doc(db, "emails", `${email.id}`), {read: true}).then(responce => null)
  }, [])    
  return (
    <section className='email'>
        <div className="email__menu">
            <ul className="email__buttons">
                <li className="email__button"><button onClick={() => navigate(-1)}><ArrowBackIcon /></button></li>
                <li className="email__button"><button><StarIcon /></button></li>
                <li className="email__button"><button><AccessTimeFilledIcon /></button></li>
                <li className="email__button"><button><ErrorIcon /></button></li>
                <li className="email__button"><button><DeleteIcon /></button></li>
            </ul>
        </div>
        <div className="email__subject">
            <h2>{email?.subject}</h2>
            <KeyboardDoubleArrowRightOutlinedIcon />
            
        </div>
        <div className="email__author">
            <div className="email__author-photo"><img src={email?.authorPhoto}></img></div>
            <div className="email__author-info">
                <h4>{email?.authorName}<span>{email?.authorEmail}</span></h4>
                <p>to me</p>
            </div>
        </div>
        <div className="email__area">
            <p>{email?.text}</p>
            <hr></hr>
            <button>
                <ReplyIcon />
                Reply
            </button>
        </div>
        
    </section>
  )
}

export default Email