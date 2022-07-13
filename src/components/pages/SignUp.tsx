import { FC, useState } from 'react'
import { auth } from '../../firebase/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from '../UI/Button'
import { IFormFields } from '../../interfaces';
import Input from '../UI/Input';

export const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmation: yup.string().oneOf([yup.ref('password'), null]).required(),
}).required();

const SignUp:FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmation, setConfirmation] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormFields>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<IFormFields> = data => {
    createUserWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => { 
      dispatch(login({
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        photo: userCredential.user.photoURL
      }));
      navigate('/inbox')
    }).catch((error) => {
      console.log(error.message)
    });
  }
  return (
    <div className='register'>
        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
            <img src='assets/images/logo.svg' alt='logo'></img>
            <h1>Sign up</h1>
            <Input name='email' register={register} field={email} setField={setEmail} errors={errors}/>
            <Input name='password' register={register} field={password} setField={setPassword} errors={errors}/>
            <Input name='confirmation' register={register} field={confirmation} setField={setConfirmation} errors={errors}/>
            <div className="register__buttons">
              <NavLink to='/login'>Back</NavLink>
              <Button>Sign up</Button>
            </div>
        </form>
    </div>
  )
}

export default SignUp