import React from 'react'
import { TextField, Button } from '@mui/material'

export default function BetterLoginGroup({doLogin, loginForm, setLoginForm}) {
  return (
    <div className='flex flex-col gap-5 items-center'>
        <h2 >Login here.</h2>
        <div className='flex flex-col gap-5'>
            <TextField size="small" label="Username" value={loginForm.username} onChange={(e)=>{setLoginForm({...loginForm, username:e.target.value})}}/>
            <TextField size="small" label="Password" value={loginForm.password} onChange={(e)=>{setLoginForm({...loginForm, password:e.target.value})}} />
            <Button className="login-button" onClick={()=> {doLogin()}}>Login!</Button>
        </div>
    </div>
  )
}
