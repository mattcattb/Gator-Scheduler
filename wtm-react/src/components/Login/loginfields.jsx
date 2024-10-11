import { TextField, Box } from "@mui/material";

import "./login.css"

export function LoginFields({username, setUsername, password, setPassword}){
    return(
        <Box class="login-fields">
            <TextField label="Username" value={username} onChange={(e) => {setUsername(e.target.value)}}></TextField>
            <TextField label="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}></TextField>
        </Box>
    );
}