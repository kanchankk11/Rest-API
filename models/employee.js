const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
    empId : {
        type : Number,
        required : true,
        unique : [true, "EmpID already exists"]
    },
    name : {
        type : String,
        required : true,
        minlength : 3
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email already exists"],
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Invalid Email")
        }
    },
    phone : {
        type : Number,
        required : true,
        minlength : 10,
        maxlength : 10
    },
    address : {
        type : String,
        required : true
    }
});

//* Creating collection

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;