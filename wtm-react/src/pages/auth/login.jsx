import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const login = async () => {
    console.log("submitting login: ", loginForm);
    const result = await handleLogin(loginForm.username, loginForm.password);
    console.log(result);

    if (result.success) {
      console.log("going home...");
      navigate("/home");
    } else {
      setErrorMessage(result.message);
    }		
  }

  return( 
    <div className='min-h-screen flex flex-col items-center mt-20 gap-5'>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className='p-4 text-2xl'>
        <h1 className='text-5xl font-bold m-3 text-orange-600'>Welcome to Swamp Sync!</h1>
      </div>
      <div className='flex flex-col gap-5 items-center bg-green-700 p-6 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold text-white mb-4'>Login here.</h2>
      <div className='flex flex-col gap-5 w-full'>
        <input
          type="text"
          placeholder="Username"
          value={loginForm.username}
          onChange={(e) => { setLoginForm({ ...loginForm, username: e.target.value }) }}
          className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500'
        />
        <input
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) => { setLoginForm({ ...loginForm, password: e.target.value }) }}
          className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500'
        />
        <button
          onClick={() => { login() }}
          className='w-full py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'>
          Login!
        </button>
        <p className='text-white text-md'>
          Dont have an account? 
          <Link to="/register" className='rounded-md inline-block ml-2 px-4 py-2 text-white bg-blue-500 round'>
            Register Here
          </Link>
        </p>
      </div>
      <Link to="/" className=' w-auto px-5 bg-red-400 text-black hover:bg-red-500 rounded-md'>Back</Link>

    </div>
  </div>
  );
}

export default LoginPage;