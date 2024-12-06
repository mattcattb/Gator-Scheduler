import React, { useContext } from 'react';
import { useState } from 'react';
import {Box, Chip} from '@mui/material'
import { LoginGroup } from '../components/Login/logingroup';
import {UserContext} from '../context/UserProvider';

import "../styles/login.css"


const admin_user =   {
  "_id": "616f1c7697a0c4791b7c0195" ,
  "name": "Alice Smith",
  "username": "alice_smith",
  "password": "password123",
  "icon": "https://example.com/icons/alice.png",
  "events": [
    "615f1c7697a0c4791b7c0191",
    "615f1c7697a0c4791b7c0192" 
  ],
  "meetings": [
    "615f1c7697a0c4791b7c0193" 
  ],
  "invited_meetings": [],
  "friends": [
    "616f1c7697a0c4791b7c0196" ,
    "616f1c7697a0c4791b7c0198" 
  ],
  "invited_friends": []
}

function Login() {

  const { setUser } = useContext(UserContext);
  const [usernameLogin, setUsernameLogin] = useState('');  // State for username for login
  const [passwordLogin, setPasswordLogin] = useState('');  // State for password for login
  const [usernameRegister, setUsernameRegister] = useState('');  // State for username for login
  const [passwordRegister, setPasswordRegister] = useState('');  // State for password for login
  const [nameLogin, setNameLogin] = useState('');
  const [nameRegister, setNameRegister] = useState('');

  async function doLogin(name, username, password, navigate){ 
    const loginData = {
      name: name,
      username: username,
      password: password
    };
    console.log("Login Attempted:", loginData);
  
    // if(username === 'admin' && password === 'admin'){
    //   sessionStorage.setItem('token', 123456789);
    //   setUser(admin_user);
    //   console.log('token added to session storage');
    //   navigate("/home");
    //   return;
    // }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if(response.ok){
        const data = await response.json();
        const userId = data.userId;
        
        const userResponse = await fetch(`${process.env.REACT_APP_BACKEND}api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("User data fetched successfully:", userData);
  
          sessionStorage.setItem('token', userId);
          setUser(userData);
          navigate("/home");
        } else {
          console.error('Failed to fetch user data');
        }
      } else {
        console.error('Login failed:', await response.json());
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  
  async function doRegister(name, username, password, navigate){ 
    const registerData = {
      name: name,
      username: username,
      password: password
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const userId = data.userId;
  
        const userResponse = await fetch(`${process.env.REACT_APP_BACKEND}api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("User data fetched successfully:", userData);
  
          sessionStorage.setItem('token', userId);
          setUser(userData);
          navigate("/home");
        } else {
          console.error('Failed to fetch user data');
        }
      } else {
        console.error('Registration failed:', await response.json());
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  return (
    <Box className="login-page">
      {/* consider moving to a component for styling */}
      <LoginGroup className="login-group"
        headerPrompt={"Already Registered?"}
        buttonPrompt={"Click to Login!"}
        username={usernameLogin}
        setUsername={setUsernameLogin}
        password={passwordLogin}
        setPassword={setPasswordLogin}
        button={doLogin}
        name={nameLogin}
        setName={setNameLogin}/>
      <LoginGroup className="register-group"
        headerPrompt={"Register Here"}
        buttonPrompt={"Click to Register!"}
        username={usernameRegister}
        setUsername={setUsernameRegister}
        password={passwordRegister}
        setPassword={setPasswordRegister}
        button={doRegister}
        name={nameRegister}
        setName={setNameRegister}/>
      <Chip label='just use "admin" and "admin" for now' style={{
        display: 'flex',
        alignSelf: 'center',
        width: 'fit-content',
        margin: 'auto',
      }}></Chip>
    </Box>
  );
}

export default Login;