export async function askAI(model, prompt){

let endpoint="";

if(model==="ChatGPT"){
endpoint="/api/chatgpt";
}

if(model==="Claude"){
endpoint="/api/claude";
}

if(model==="Gemini"){
endpoint="/api/gemini";
}

if(model==="Perplexity"){
endpoint="/api/perplexity";
}

let response = await fetch(endpoint,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({prompt:prompt})
});

let data = await response.json();

return data.reply;

}
