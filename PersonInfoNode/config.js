var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// 5. Model-Schema-Mapping with collection on Mongo DB and
// establishing collection with it.'
mongoose.connect(
    "mongodb://localhost/PersonalInformation", {
        useNewUrlParser: true
    }
);

// 5a. get the connection object
// if dbConnect is not undefined then the connection is successful


module.exports = { mongoose };