import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const { handleRegister } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const [registerForm, setRegisterForm] = useState({
    name: "",
    username: "",
    password: ""
  });

  const register = async () => {
    console.log("submitting register: ", registerForm);
    const result = await handleRegister(registerForm.name, registerForm.username, registerForm.password);
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
      <h2 className='text-2xl font-bold text-white mb-4'>Register here.</h2>
      <div className='flex flex-col gap-5 w-full'>
        <input 
          type="text"
          placeholder='Name'
          value={registerForm.name}
          onChange={(e)=> {setRegisterForm({...registerForm, name:e.target.value})}}
          className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500'
        
        />

        <input
          type="text"
          placeholder="Username"
          value={registerForm.username}
          onChange={(e) => { setRegisterForm({ ...registerForm, username: e.target.value }) }}
          className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500'
        />
        <input
          type="password"
          placeholder="Password"
          value={registerForm.password}
          onChange={(e) => { setRegisterForm({ ...registerForm, password: e.target.value }) }}
          className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500'
        />
        <button
          onClick={() => { register() }}
          className='w-full py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'>
          Login!
        </button>
        <p className='text-white text-md'>
          Already have an account? 
          <Link to="/login" className='rounded-md inline-block ml-2 px-4 py-2 text-white bg-blue-500 round'>
            Login Here
          </Link>
        </p>      
      </div>
      <Link to="/" className=' w-auto px-5 bg-red-400 text-black hover:bg-red-500 rounded-md'>Back</Link>
    </div>
  </div>
  );
}

export default RegisterPage;