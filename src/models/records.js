const mongoose=require("mongoose");
// const Schema = mongoose.Schema;
const Recordschema=new mongoose.Schema({
    userid: { 
        type: Number,
        
        required: true,
    }, 
    platform:{
        type: String,
        required :true
    },
    genre : {
        type: String,
        required: true,
    },
    link:{
        type: String,
        required: true,
    },
   
    title:{
        type: String,
    }

}) 



// now we need to create Collection
const records= mongoose.model("records",Recordschema) ;
module.exports=records;