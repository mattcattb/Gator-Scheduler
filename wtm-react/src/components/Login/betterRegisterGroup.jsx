import React from 'react'
import { TextField, Button } from '@mui/material'

export default function BetterRegisterGroup({doRegister, registerForm, setRegisterForm}) {
  return (
    <div>
        <h2>Register here.</h2>
        <div>
            <TextField label="Name" value={registerForm.name} onChange={(e)=>{setRegisterForm({...registerForm, name:e.target.value})}}/>
            <TextField label="Username" value={registerForm.username} onChange={(e)=>{setRegisterForm({...registerForm, username:e.target.value})}}/>
            <TextField label="Password" value={registerForm.password} onChange={(e)=>{setRegisterForm({...registerForm, password:e.target.value})}} />
        </div>
        <Button className="register-button" onClick={()=> {doRegister()}}>Register!</Button>
    </div>
  )
}
