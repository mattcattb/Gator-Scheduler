import express from 'express';
import dotenv from 'dotenv';

const app = express();
const port = 3004

app.listen(port, () =>{
    console.log("Server is Successfully Running, and App is listening on port " + port)
});