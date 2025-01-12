import axios from './axios';


// src/services/userService.js
export const doLoginAPI = async (username, password) => {
  
  try {
    const loginResponse = await axios.post('api/auth/login', {
      username:username,
      password:password
    })
    console.log("response from api/auth/login: ", loginResponse)
    const userId = loginResponse.data.userId;
    const userResponse = await axios.get(`/api/user/${userId}`);
    console.log("response from /api/user/$id: ", userResponse)
    return {
      ...loginResponse.data,
      userData: userResponse.data,
      msg:"logged in correctly!"
    };
  } catch (error) {
    throw error
  };
};

export const doRegisterAPI = async (name, username, password) => {

  try {

    const registerResponse = await axios.post('/api/auth/register', {
      name,
      username, 
      password
    });

    const userId = registerResponse.data.userId;
    const userResponse = await axios.get(`/api/user/${userId}`);

    return {
      ...registerResponse,
      userData: userResponse.data
    }
  } catch (error) {
    throw error;
  }
};