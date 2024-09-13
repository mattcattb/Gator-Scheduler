import express, {Application} from 'express';
import dotenv from 'dotenv';

dotenv.config({path: ".env"});
const port : string|undefined = process.env.PORT;
const app : Application = express();

app.listen(port, () =>{
    console.log("Server is Successfully Running, and App is listening on port " + port)
});