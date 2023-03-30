import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { routes } from './routes/api';
dotenv.config();

const running = {
    msg : "server is runnig",
    port : process.env.PORT,
    status: 200
};


const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname,"/public")));
server.use(express.urlencoded({extended:true}));

server.use(routes);
console.log(running);


server.listen(running.port);