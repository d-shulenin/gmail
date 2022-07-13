import { FC } from 'react';
import Item from '../UI/Item';
import { DocumentData } from 'firebase/firestore';

interface EmailsListProps {
  emails: DocumentData[]
}

const EmailsList:FC<EmailsListProps> = ({emails}) => {
  return (
    <section className='list'>
      {emails.map(email => <Item key={email.id} id={email.id} author={email.author} recipient={email.recipient} subject={email.subject} 
      text={email.text} date={email.date} read={email.read} starred={email.starred} snoozed={email.snoozed} spam={email.spam} 
      trash={email.trash}/>)}
    </section>
  )
}

export default EmailsList