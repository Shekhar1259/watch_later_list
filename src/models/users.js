const mongoose=require("mongoose");

const userschema=new mongoose.Schema({

    name:{
        type:String,
        requires:true
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
        
    },
    exports_bool:{
        type:Boolean
    }

})

const users=mongoose.model("users",userschema);
module.exports=users