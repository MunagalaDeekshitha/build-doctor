// Optional AI backend: explains build logs with Claude on Amazon Bedrock.
// Without AWS credentials the web app still works using its built-in demo rules.
const http=require("http"),fs=require("fs");
const {BedrockRuntimeClient,ConverseCommand}=require("@aws-sdk/client-bedrock-runtime");
const client=new BedrockRuntimeClient({region:process.env.AWS_REGION||"us-east-1"});
const MODEL=process.env.BEDROCK_MODEL_ID; // set to a Claude model ID enabled in your account
http.createServer(async(req,res)=>{
 if(req.method==="POST"&&req.url==="/api/explain"){
  let b="";for await(const c of req)b+=c;
  try{
   const {log}=JSON.parse(b);
   const out=await client.send(new ConverseCommand({modelId:MODEL,
    system:[{text:'You explain failed CI build logs to students. Reply with ONLY JSON: {"line":"exact failing log line","cause":"1-2 plain sentences","fix":"concrete steps or code"}'}],
    messages:[{role:"user",content:[{text:log.slice(-8000)}]}]}));
   const t=out.output.message.content[0].text.replace(/```json|```/g,"").trim();
   res.writeHead(200,{"Content-Type":"application/json"});res.end(t);
  }catch(e){res.writeHead(500);res.end(String(e.message))}
  return}
 res.writeHead(200,{"Content-Type":"text/html"});res.end(fs.readFileSync(__dirname+"/index.html"));
}).listen(3000,()=>console.log("Build Doctor on http://localhost:3000"));
