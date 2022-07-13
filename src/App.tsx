import {useEffect, useState, createContext} from 'react';

import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';

import './scss/index.scss';

import { Routes, Route, useNavigate } from 'react-router-dom'

import { RootState } from './store/store';
import { login } from './store/slices/userSlice'
import { useDispatch } from 'react-redux'

import { auth, db } from './firebase/firebase'
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

import useTypedSelector from './hooks/useTypedSelector';

import { IContext } from './interfaces';


export const Context = createContext<IContext>({
  emails: [], 
  composeVisibility: false, 
  setComposeVisibility: () => null,
  infoVisibility: false,
  setInfoVisibility: () => null,
})


function App() {
  const user = useTypedSelector((state: RootState) => state.user.user)
  const emailsCollectionRef = collection(db, 'emails')
  
  const [infoVisibility, setInfoVisibility] = useState(false)
  const [emails, setEmails] = useState<DocumentData[]>([])
  const [composeVisibility, setComposeVisibility] = useState<boolean>(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getEmails = async () => {
    const docs = await (await getDocs(emailsCollectionRef)).docs.map(doc => doc.data())
    return docs
  }

  useEffect(() => {
    navigate(user ? '/inbox' : '/login')
  }, [user])
  useEffect(() => {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: user?.name,
        photoURL: user?.photo,
      })
    }
  }, [user?.name, user?.photo])
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) dispatch(login({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }))
    })
    getEmails().then(responce => setEmails(responce))
  }, [])
  
  if (!user) return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<SignUp />} />
    </Routes>
  )
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}} 
    onClick={() => setInfoVisibility(false)}>
      <Context.Provider value={{emails, composeVisibility, setComposeVisibility, infoVisibility, setInfoVisibility}}>
        <Header setInfoVisibility={setInfoVisibility}/>
        <Content />
      </Context.Provider>
    </div>
  );
}

export default App;
