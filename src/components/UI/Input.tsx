import React, {FC} from 'react'
import { IFormFields } from '../../interfaces';
import { Path, UseFormRegister, FieldErrors } from 'react-hook-form'; 

interface InputProps {
    name: Path<IFormFields>;
    register: UseFormRegister<IFormFields>;
    field: string;
    setField: React.Dispatch<React.SetStateAction<string>>;
    errors: FieldErrors<IFormFields>;
}

const Input:FC<InputProps> = ({ name, register, field, setField, errors }) => {
  return (
    <label className='input'>
        <input type={name === 'email' ? 'text' : 'password'} {...register(name, { required: true})} value={field} onChange={e => setField(e.target.value)}></input>
        <span style={{transform: field ? 'translate(-0.4rem, -1.15rem) scale(.75)' : ''}}>{name[0].toUpperCase()+name.slice(1)}</span>
        <p>{errors[name]?.message}</p>
    </label>
  )
}

export default Input