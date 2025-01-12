import React, { useContext, useState } from 'react';
import {UserContext} from '../context/UserProvider';

import BetterLoginGroup from '../components/Login/betterLoginGroup'
import BetterRegisterGroup from '../components/Login/betterRegisterGroup';

import "../styles/login.css"

// todo: Seperate into Login and Authentication Page

function Login() {

  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
	const [loginForm, setLoginForm] = useState({
		username:"",
		password:""
	})

	const [registerForm, setRegisterForm] = useState({
		name:"",
		username:"",
		password:""
	});

	const handleLogin = async () => {
		const result = await doLogin(loginForm.username, loginForm.password);
		if (result.success) {
			sessionStorage.setItem('token', result.userId);
			setUser(result.userData);
			navigate("/home")
		} else {
			setErrorMessage(result.message)
		}
	}

	const handleRegister = async () => {
		const result = await doRegister(registerForm.name, registerForm.username, registerForm.password);
    if (result.success) {
      sessionStorage.setItem('token', result.userId);
      setUser(result.userData);
      navigate("/home");
    } else {
      setErrorMessage(result.message);
    }		
	}


	return( 
		<div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <BetterLoginGroup loginForm={loginForm} setLoginForm={setLoginForm} doLogin={handleLogin}/>
			<BetterRegisterGroup registerForm={registerForm} setRegisterForm={setRegisterForm} doRegister={handleRegister}/>			
		</div>
	)
}

export default Login;