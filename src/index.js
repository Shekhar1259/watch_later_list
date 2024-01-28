const express=require('express');
const app=express();
require('dotenv').config();

const path = require('path')
const { ObjectId } = require('mongodb');

app.use(express.json());
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }))
const port = 3000;
mongoose.connect("mongodb://127.0.0.1:27017/Randome")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  const savedrecord=require("./models/records.js");


  app.get("/",(req,res)=>{
    res.send("hello");
  })

  app.get("/savedrecord",async (req,res)=>{
    try
    {
        const recordsdata=await savedrecord.find({"userid":1});
        res.status(200).json(recordsdata);

    }
    catch(err)
    {
      console.error("error fetching data: ",err);
    }
  })

  app.delete("/deleterecord/:recordid",async(req,res)=>{
    try
    {
      const objectid=req.params.recordid;
      const result=await savedrecord.deleteOne({_id:objectid});
      if(result.deletedCount===0)
      {
        res.status(404).json({message:"document was not found or deleted"});
      }
      res.status(200).json({message:"document deleted successfully"});

    }
    catch(err)
    {
      res.status(500).json({error:"internal server error"});
      console.error("error deleting record",err);
    }
  })
  app.put("/editrecord/:recordid", async (req, res) => {
    try {
      const recordId = req.params.recordid;
      //console.log(recordId)
      const updatedData = req.body;
      //console.log(updatedData)
      
  
      const result=await savedrecord.findOneAndUpdate({_id:recordId},updatedData);
        console.log(result);
      if (1) {
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        res.status(500).json({ message: "Record was not updated" });
      }
    } catch (err) {
      console.error("Internal server error", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.post("/addrecord",async(req,res)=>{
    try
    {
      // const userid=1;
      // const link=req.body.link;
      // const genre=req.body.genre;
      // const platform=req.body.platform;
      const insertdata={
        userid:1,
        link:req.body.link,
        genre:req.body.genre,
        platform:req.body.platform
      }

      const result=await savedrecord.insertMany([insertdata]);
      res.status(200).json({message:"record inserted successfully",id:result.insertedId});

    }
    catch(err)
    {
      res.status(500).json({message:"internal server error"})
      console.error("internal server error",err);
    }
  })

app.get("*", (req, res) => {
    res.send("Error 404 Invalid Endpoint");
})

const records=require("./models/records.js");



app.listen(port, () => {
    console.log(`Server is running in port no ${port}`);
})