const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    UserId:String,
    UserName:String,
    Email:String,
    Password:String,
    RoleId:String
});

const userModel = mongoose.model("Users", userSchema, "Users");
module.exports = userModel;