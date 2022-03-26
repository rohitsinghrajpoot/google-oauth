const mongoose = require("mongoose")
//const { post } = require("..")

const postSchema = mongoose.Schema({
    title:{type:String,required:true,},
    body:{type:String,required:true},
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
},
{
   versionKey:false,
   timestamps:true,
}, 

)

module.exports= mongoose.model("post",postSchema)