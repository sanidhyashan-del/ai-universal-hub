import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chatgpt", async (req,res)=>{
const prompt=req.body.prompt;

const response=await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer YOUR_OPENAI_KEY"
},
body:JSON.stringify({
model:"gpt-4o-mini",
messages:[{role:"user",content:prompt}]
})
});

const data=await response.json();

res.json({reply:data.choices[0].message.content});
});

app.listen(3000,()=>{
console.log("AI router running");
});
