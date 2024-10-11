import { Box, Button } from "@mui/material";
import {LoginFields} from "./loginfields.jsx" 
import { useNavigate } from 'react-router-dom';

import "./login.css"

export function LoginGroup({headerPrompt, buttonPrompt, username, setUsername, password, setPassword, button}){
  const navigate = useNavigate();
    return(
      <Box className="all-login-groups">
        <h2 className="login-headertext">{headerPrompt}</h2>
        <LoginFields username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
        <Button className="login-button" onClick={() => {button(username, password, navigate)}}>{buttonPrompt}</Button>
      </Box>
    );
}