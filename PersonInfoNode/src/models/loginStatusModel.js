const mongoose = require('mongoose');

const loginStatusSchema = mongoose.Schema({
    StatusId:Number,
    UserName:String,
    LoginFrom:String,
    DateTime:Date,
    IpAddress:String
});

const loginStatusModel = mongoose.model("LoginStatus", loginStatusSchema, "LoginStatus");
module.exports = loginStatusModel;