import { Box, Button } from "@mui/material";
import {LoginFields} from "./loginfields.jsx" 

export function LoginGroup({headerPrompt, buttonPrompt, username, setUsername, password, setPassword, button}){
    return(
      <Box className='Login-Group'>
        <h2>{headerPrompt}</h2>
        <LoginFields username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
        <Button onClick={() => {button(username, password)}}>{buttonPrompt}</Button>
      </Box>
    );
}