import { FC, useState, MouseEvent, useContext } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase/firebase'
import { IEmail } from '../../interfaces'
import { Context } from '../../App'
import Button from '../UI/Button'
import { IComposeForm } from '../../interfaces'

interface CompositionProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const Composition:FC<CompositionProps> = ({setSuccess}) => {
  const {composeVisibility, setComposeVisibility} = useContext(Context)
  const [formFields, setFormFields]  = useState<IComposeForm>({ recipient: '', subject: '', text: ''}) 
  const date = new Date().toString().split(' ').slice(1,3).join(' ')
  async function sendEmail(e: MouseEvent) {
    e.preventDefault()
    const newEmail = {
      id: Math.random().toString().slice(2, 15),
      authorEmail: auth.currentUser?.email,
      authorPhoto: auth.currentUser?.photoURL,
      authorName: auth.currentUser?.displayName,
      recipient: formFields.recipient,
      subject: formFields.subject,
      text: formFields.text,
      date,
      read: false,
      starred: false,
      snoozed: false,
      spam: false,
      trash: false
    }
    await setDoc(doc(db, "emails", `${newEmail.id}`), newEmail).then(() => {
      setSuccess(true) 
    }).catch(error => alert(error.message))
    setComposeVisibility(false)
    setTimeout(() => setSuccess(false), 2000)
    setFormFields({recipient: '', subject: '', text: ''})
  }
  return (
    <div className="compose" style={{display: composeVisibility ? 'flex' : 'none'}}>
      <div className='compose__title'>
          <h2>New Message</h2>
          <button onClick={e=> {e.preventDefault(); setComposeVisibility(false)}}><img src='assets/images/close.svg' alt='close'></img></button>
      </div>
      <form className='compose__form'>
        <div className="compose__inputs">
            <input type="text" value={formFields.recipient} onChange={e => setFormFields({...formFields, recipient: e.target.value})} placeholder='Recipient'/>
            <hr></hr>
            <input type="text" value={formFields.subject} onChange={e => setFormFields({...formFields, subject: e.target.value})} placeholder='Subject'/>
            <hr></hr>
            <textarea value={formFields.text} onChange={e => setFormFields({...formFields, text: e.target.value})} placeholder='Body Text'/>
        </div>
        <Button handler={sendEmail} disabled={formFields.recipient && formFields.subject && formFields.text ? false : true}>Send</Button>
      </form>
    </div>
  )
}

export default Composition