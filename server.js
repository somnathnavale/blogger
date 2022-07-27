import path from 'path';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./route/postRoute.js"; 
import connection  from "./database/db.js";
dotenv.config();

const PORT=process.env.PORT || 8000;
const username_DB=process.env.username_DB || '';
const pwd_DB=process.env.pwd_DB || '';
const URL= process.env.MONGODB_URI || `mongodb+srv://${username_DB}:${pwd_DB}@blogger.lbjwd.mongodb.net/Blogger?retryWrites=true&w=majority`

const app=express();
connection(URL);

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/',router);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("blogger/build"));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'blogger','build','index.html'));
    })
}

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})

