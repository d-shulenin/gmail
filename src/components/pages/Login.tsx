import {FC, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase'
import Button from '../UI/Button';
import Input from '../UI/Input';
import { useForm, SubmitHandler } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IFormFields } from '../../interfaces';

export const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

const Login:FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormFields>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<IFormFields> = data => {
    signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => { 
        dispatch(login({
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          photo: userCredential.user.photoURL,
        }));    
        navigate('/inbox')
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className='login'>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <img src='assets/images/logo.svg' alt='logo'></img>
        <h1>Sign in</h1>
        <h3>to continue to Gmail</h3>
        <Input name='email' register={register} field={email} setField={setEmail} errors={errors}/>
        <Input name='password' register={register} field={password} setField={setPassword} errors={errors}/>
        <div className="login__buttons">
            <NavLink to='/register'>Create account</NavLink>
            <Button>Sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default Login