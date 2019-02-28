const mongoose = require('mongoose');



const roleSchema = mongoose.Schema({
    RoleId: String,
    RoleName: String
});

const roleModel = mongoose.model("Roles", roleSchema, "Roles");
module.exports = roleModel;