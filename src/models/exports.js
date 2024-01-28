const mongoose=require("mongoose");

const exportschema=new mongoose.Schema({

    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true

    },
    recordid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    learnt:{
        type:String,
        
    }
})

const exports=mongoose.model("exports",exportschema);
module.exports=exports;