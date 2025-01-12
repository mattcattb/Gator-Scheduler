import React from 'react'
import { TextField, Button } from '@mui/material'

export default function BetterLoginGroup({doLogin, loginForm, setLoginForm}) {
  return (
    <div>
        <h2 >Login Below!</h2>
        <div>
            <TextField label="Username" value={loginForm.username} onChange={(e)=>{setLoginForm({...loginForm, username:e.target.value})}}/>
            <TextField label="Password" value={loginForm.password} onChange={(e)=>{setLoginForm({...loginForm, password:e.target.value})}} />
        </div>
        <Button className="login-button" onClick={()=> {doLogin()}}>Login!</Button>
    </div>
  )
}
