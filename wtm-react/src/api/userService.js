// src/services/userService.js
export const doLogin = async (name, username, password) => {
  const loginData = { name, username, password };
  
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      const userId = data.userId;

      const userResponse = await fetch(`${process.env.REACT_APP_BACKEND}api/user/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        return { success: true, userData, userId };
      } else {
        return { success: false, message: 'Failed to fetch user data.' };
      }
    } else {
      return { success: false, message: 'Login failed.' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const doRegister = async (name, username, password) => {
  const registerData = { name, username, password };

  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });

    if (response.ok) {
      const data = await response.json();
      const userId = data.userId;

      const userResponse = await fetch(`${process.env.REACT_APP_BACKEND}api/user/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        return { success: true, userData, userId };
      } else {
        return { success: false, message: 'Failed to fetch user data.' };
      }
    } else {
      return { success: false, message: 'Registration failed.' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};