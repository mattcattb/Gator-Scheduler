import express, {Application} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app : Application = express();
const port : string = process.env.PORT!;

app.listen(port, () =>{
    console.log("Server is Successfully Running, and App is listening on port " + port)
});