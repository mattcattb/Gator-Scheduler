import { TextField, Box } from "@mui/material";

export function LoginFields({username, setUsername, password, setPassword}){
    return(
        <Box>
            <TextField label="Username" value={username} onChange={(e) => {setUsername(e.target.value)}}></TextField>
            <TextField label="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}></TextField>
        </Box>
    );
}