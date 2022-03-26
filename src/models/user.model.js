const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema  = mongoose.Schema({
     name:{type:String,required:false},
     email:{type:String,required:true,unique:true},
     password:{type:String,required:true},
     role:[{type:String}]
},
{
    versionKey:false,
    timestamps:true,
},
)
userSchema.pre("save",function(next){
    const hash = bcrypt.hashSync(this.password, 8)
    this.password=hash
return next()
})

userSchema.methods.checkPassword= function(password){
   return bcrypt.compareSync(password, this.password)
}

module.exports= mongoose.model("user",userSchema)