import React from 'react';
import { useState } from 'react';
import {Chip, Typography, Button} from '@mui/material'
import { LoginFields } from '../components/Login/loginfields';


function doLogin(username, password){ // called when a user clicks login

}

function doRegister(username, password){ // called when a user clicks register

}

function Login() {

  const [usernameLogin, setUsernameLogin] = useState('');  // State for username for login
  const [passwordLogin, setPasswordLogin] = useState('');  // State for password for login
  const [usernameRegister, setUsernameRegister] = useState('');  // State for username for login
  const [passwordRegister, setPasswordRegister] = useState('');  // State for password for login

  return (
    <div className="Login-Page">
      <div className='Login-Group'>
        <h2>Already Registered?</h2>
        <LoginFields username={usernameLogin} setUsername={setUsernameLogin} password={passwordLogin} setPassword={setPasswordLogin}/>
        <Button>Click to Login!</Button>
      </div>
      <div className='Registration-Group'>
        <h2>Register Here!</h2>
        <LoginFields username={usernameRegister} setUsername={setUsernameRegister} password={passwordRegister} setPassword={setPasswordRegister}/>
        <Button>Click to Register!</Button>
      </div>
    </div>
  );
}

export default Login;