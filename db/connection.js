const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const dbURL = "mongodb://127.0.0.1:27017/Employee";
console.log("Connecting with mongoDB...");
mongoose.connect(dbURL, {

}).then(()=>{
    console.log("Connected with mongoDB.");
}).catch(err => console.log("Connection failed with mongoDB."));
