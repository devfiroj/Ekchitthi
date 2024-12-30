const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        minLength: 1,
        trim:true,
    },
    letters: [{
        msg: {
            type:String,
        },
        sender: {
            type: String,
        }
    }],
});

module.exports=mongoose.model("user",userSchema);