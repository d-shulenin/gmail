import {FC, useContext, useState} from 'react'
import Sidebar from '../sections/Sidebar'
import {Routes, Route} from 'react-router-dom'
import EmailsList from '../sections/List'
import Composition from '../Modals/Composition'
import { Context } from '../../App'
import Alert from '@mui/material/Alert';
import { auth } from '../../firebase/firebase'
import Email from './../sections/Email'

const Content:FC = () => {
  const {emails} = useContext(Context)
  const [success, setSuccess] = useState<boolean>(false)
  const inboxEmails = emails.filter(email => email.recipient === auth.currentUser?.email && email.trash === false && email.spam === false)
  return (
    <div className='content'>
        <Sidebar />
        <Routes >
            <Route path='/inbox/:id' element={<Email/>} />
            <Route path='/inbox' element={<EmailsList emails={inboxEmails}/>}></Route>
            <Route path='/starred' element={<EmailsList emails={inboxEmails.filter(email => email.starred === true)}/>}></Route>
            <Route path='/snoozed' element={<EmailsList emails={inboxEmails.filter(email => email.snoozed === true)}/>}></Route>
            <Route path='/sent' element={<EmailsList emails={emails.filter(email => email.author === auth.currentUser?.email)}/>}></Route>
            <Route path='/spam' element={<EmailsList emails={emails.filter(email => email.recipient === auth.currentUser?.email && email.spam === true)}/>}></Route>
            <Route path='/trash' element={<EmailsList emails={emails.filter(email => email.recipient === auth.currentUser?.email && email.trash === true)}/>}></Route>
        </Routes>
        <Composition setSuccess={setSuccess}/>
        <Alert style={{display: success ? 'flex' : 'none', transition: 'display 0.4s ease-in-out', position: 'absolute', bottom: '0.5rem', right: '0.5rem'}} severity="success">Email has been sent</Alert>
    </div>
  )
}

export default Content