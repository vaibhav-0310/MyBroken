import express from "express";
import cors from "cors";
import "dotenv/config";
import openrouter from "../routes/openrouter.routes.js";

const app=express();

const port=process.env.PORT || 8000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({ extended: true }));


app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
});

app.use('/api',openrouter);

app.get("/",(req,res)=>{
    res.send("Server is running");
});