const mongoose=require("mongoose");
const dbgr=require("debug")("development:mongoose")
const config=require("config");
const username = encodeURIComponent("skfiroj");
const password = encodeURIComponent("Sk@713423");
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.nf29k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports=mongoose.connection;