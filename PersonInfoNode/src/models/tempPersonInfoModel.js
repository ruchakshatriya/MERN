const mongoose = require('mongoose');

const tempPersonInfoSchema = mongoose.Schema({
    TempPersonId: String,
    UserId: String,
    FirstName: String,
    MiddleName: String,
    LastName: String,
    Gender: String,
    DOB: Date,
    Age: Number,
    FlatNumber: String,
    SocietyName: String,
    StreetName: String,
    City: String,
    State: String,
    Pincode: Number,
    PhoneNumber: Number,
    MobileNumber: Number,
    PhysicalDisability: String,
    MaritalStatus: String,
    EducationStatus: String,
    BirthSign: String
});

const tempPersonInfoModel = mongoose.model("TempPersonInfo", tempPersonInfoSchema, "TempPersonInfo");
module.exports = tempPersonInfoModel;