import React from 'react'
import { TextField, Button } from '@mui/material'

export default function BetterRegisterGroup({doRegister, registerForm, setRegisterForm}) {
  return (
    <div className='flex flex-col gap-5 items-center'>
        <h2>Register here.</h2>
        <div className='flex flex-col gap-5'>
            <TextField size="small" label="Name" value={registerForm.name} onChange={(e)=>{setRegisterForm({...registerForm, name:e.target.value})}}/>
            <TextField size="small" label="Username" value={registerForm.username} onChange={(e)=>{setRegisterForm({...registerForm, username:e.target.value})}}/>
            <TextField size="small" label="Password" value={registerForm.password} onChange={(e)=>{setRegisterForm({...registerForm, password:e.target.value})}} />
            <Button className="register-button" onClick={()=> {doRegister()}}>Register!</Button>
        </div>
    </div>
  )
}
