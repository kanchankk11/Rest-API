const express = require('express');
require('../db/connection')
const Employee = require('../models/employee');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.get("/",(req, res) => {
    res.send("Hello");
})

app.post("/employee",async (req, res) => {
    //console.log(req.body);
    const emp = new Employee(req.body);

    if(emp == null){
        res.status(500).json({
            status : 500,
            message : "Internal server error occured"
        })
    }
    else{
        try {
           const result = await emp.save(); 
           res.status(201).json({
            status : 201,
            message : result
        })
        } catch (err) {
            res.status(400).json({
                status : 400,
                message : err.message 
            })
        }
    }
     
})

app.get("/employee", async (req,res) => {
   
    let result = null;

    try {
        if(req.query.empid)
            result = await Employee.find({empId : req.query.empid});
        else
            result = await Employee.find();

        if(result == null || result.length == 0){
            res.status(404).json({
                status : 404,
                message : "No data found."
            });
        }
        
        res.send(result)
    } catch (error) {
        console.log(error);
    }
    
})

app.delete("/employee", async (req, res) => {

    try {
        if(!req.query.empid){
            res.status(400).json({
                status : 400,
                message : "empID is mandatory"
            })
        }
        else{
            let result = await Employee.find({empId : req.query.empid});
            if(result == null || result.length == 0){
                res.status(404).json({
                    status : 404,
                    message : "No data found."
                });
            }
            else{
                result = await Employee.deleteOne({empId : req.query.empid})
                console.log(result);
                if(result.acknowledged){
                    res.status(200).json({
                        status : 200,
                        message : `Emp ${req.query.empid} deleted successfully.`
                    });
                }
                else{
                    res.status(500).json({
                        status : 500,
                        message : "Internal server error."
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status : 500,
            message : "Internal server error."
        });
    }
});

app.put("/employee", async (req, res) => {
    try {
        if(!req.query.empid || JSON.stringify(req.body) === '{}'){
            
            res.status(400).json({
                status : 400,
                message : "empID & update object is mandatory."
            })
        }
        else{
            const result = await Employee.find({empId : req.query.empid});
            if(result == null || result.length == 0){
                res.status(404).json({
                    status : 404,
                    message : "No data found."
                });
            }
            else{
                let objid = result[0]._id+"";
                
                const updateEmp = await Employee.findByIdAndUpdate(objid, req.body,{
                    new : true
                })
                res.status(200).json({
                    status : 200,
                    message : updateEmp
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status : 500,
            message : "Internal server error."
        });
    }
})

app.listen(port, (err)=>{
    if(err)
        console.log("Something went wrong");
    else
        console.log(`Listening on port ${port}`);
})


