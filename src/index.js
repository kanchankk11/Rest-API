const express = require('express');
require('../db/connection')
const Employee = require('../models/employee');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.get("/",(req, res) => {
    res.send("Hello");
})

app.post("/employee",(req, res) => {
    //console.log(req.body);
    const emp = new Employee(req.body);

    if(emp == null)
        res.status(500).json({
            status : 500,
            message : "Internal server error occured"
        })
    emp.save().then(()=>{
        res.status(201).json({
            status : 201,
            message : "Inserted successfully."
        })
    }).catch((err)=> {
        res.status(400).json({
            status : 400,
            message : err.message 
        })
    })
   
})

app.get("/employee", async (req,res) => {
   
    let result = null;

    try {
        if(req.query.id)
            result = await Employee.find({empId : req.query.id});
        else
            result = await Employee.find();

        if(result == null || result.length == 0)
        res.status(404).json({
            status : 400,
            message : "No data found."
        });
        
        res.send(result)
    } catch (error) {
        console.log(error);
    }
    
})

app.listen(port, (err)=>{
    if(err)
        console.log("Something went wrong");
    else
        console.log(`Listening on port ${port}`);
})


