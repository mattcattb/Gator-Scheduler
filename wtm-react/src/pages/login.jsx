import React, { useContext, useState } from 'react';
import {UserContext} from '../context/UserProvider';
import { useNavigate } from 'react-router-dom'

import BetterLoginGroup from '../components/Login/betterLoginGroup'
import BetterRegisterGroup from '../components/Login/betterRegisterGroup';


import "../styles/login.css"

// todo: Seperate into Login and Authentication Page

function LoginPage() {
  const navigate = useNavigate()

  const { handleLogin, handleRegister } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

	const [loginForm, setLoginForm] = useState({
		username:"",
		password:""
	})

	const [registerForm, setRegisterForm] = useState({
		name:"",
		username:"",
		password:""
	});


  const handleTabClick = (isLoginTab) => {
    setIsLogin(isLoginTab);
  };


	const login = async () => {
    console.log("submitting login: ", loginForm)
		const result = await handleLogin(loginForm.username, loginForm.password);
		console.log(result)
    
    if (result.success) {
      console.log("going home...")
			navigate("/home")
		} else {
			setErrorMessage(result.message)
		}
	}

	const register = async () => {
    console.log("submitting register: ", registerForm)

		const result = await handleRegister(registerForm.name, registerForm.username, registerForm.password);
    console.log(result)
    
    if (result.success) {
      console.log("going home...")
      navigate("/home");
    } else {
      setErrorMessage(result.message);
    }		
	}

	return( 
		<div className='min-h-screen flex items-start justify-center mt-20'>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className=''>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-semibold text-sm ${
              isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleTabClick(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold text-sm ${
              !isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleTabClick(false)}
          >
            Register
          </button>
        </div>

        {isLogin? <BetterLoginGroup loginForm={loginForm} setLoginForm={setLoginForm} doLogin={login}/> :    
        <BetterRegisterGroup registerForm={registerForm} setRegisterForm={setRegisterForm} doRegister={register}/>}			
      </div>

		</div>
	)
}

export default LoginPage;