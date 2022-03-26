const app = require("./index")

const connect = require("./configs/db")

app.listen(5700, async (req,res)=>{
    try{
        await connect()
        console.log("listening port 5700")
    }catch(err){
        console.log(err.msg)
    }
})