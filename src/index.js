const express = require('express');
require('../db/connection')
const Employee = require('../models/employee');
const empRouter = require('./routers/employee');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(empRouter);

app.listen(port, (err)=>{
    if(err)
        console.log("Something went wrong");
    else
        console.log(`Listening on port ${port}`);
})


