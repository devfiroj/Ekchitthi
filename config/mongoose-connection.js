const mongoose=require("mongoose");
const dbgr=require("debug")("development:mongoose")
const config=require("config");
const username = encodeURIComponent(process.env.MONGOUSER);
const password = encodeURIComponent(process.env.MONGOPASS);
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.nf29k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports=mongoose.connection;