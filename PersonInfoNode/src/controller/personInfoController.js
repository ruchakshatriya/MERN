const personInfoModel = require('../models/personInfoModel');
const tempPersonInfoModel = require('../models/tempPersonInfoModel');
var mongodb = require('mongodb');

module.exports = {
    addEditPersonInfo: (req, res) => {
        console.log("inside addEditPersonInfo");
        let userRole = req.body.UserRole;
        let personData = req.body.PersonInfo;
        let table = req.body.Table;
        console.log("inside addEditPersonInfo table=" + table);
        let uniqueId = req.body.UniqueId;
        if (uniqueId !== "") {
            //Edit record
            if (table === "Temp") {
                var query = { TempPersonId: uniqueId };
                var newvalues = { $set: personData };
                tempPersonInfoModel.updateOne(query, newvalues, function (err, editresult) {
                    if (err) {
                        console.log("err" + JSON.stringify(err));
                        res.statusCode = 500;
                        res.send(err);
                    } else {
                        console.log("inside temp edit success" + JSON.stringify(editresult));
                        res.send({
                            status: 200,
                            data: editresult
                        });
                    }

                });
            } else {
                var query = { PersonalUniqueueID: uniqueId };
                var newvalues = { $set: personData };
                personInfoModel.updateOne(query, newvalues, function (err, editresult) {
                    if (err) {
                        console.log("err" + JSON.stringify(err));
                        res.statusCode = 500;
                        res.send(err);
                    } else {
                        console.log("inside per edit success");
                        res.send({
                            status: 200,
                            data: editresult
                        });
                    }
                });
            }
        } else {
            //Add record
            if (userRole === "1") {
                personData.PersonalUniqueueID = new mongodb.ObjectID();
                console.log("inside addpersoninfo" + JSON.stringify(personData));
                personInfoModel.create(personData, function (err, result) {
                    if (err) {
                        console.log("err" + JSON.stringify(err));
                        res.statusCode = 500;
                        res.send(err);
                    } else {
                        console.log("inside add pers success");
                        res.send({
                            status: 200,
                            data: result
                        });
                    }

                });
            } else {
                personData.TempPersonId = new mongodb.ObjectID();
                console.log("inside addtemppersoninfo" + JSON.stringify(personData));
                tempPersonInfoModel.create(personData, function (err, result) {
                    if (err) {
                        console.log("err" + JSON.stringify(err));
                        res.statusCode = 500;
                        res.send(err);
                    } else {
                        console.log("inside  add temp success");
                        res.send({
                            status: 200,
                            data: result
                        });
                    }

                });
            }

        }

    },

    getPersonInfo: (req, res) => {
        console.log("inside get person info");
        let table = req.query.table;
        let uniqueId = req.query.uniqueId;
        if (table === "Temp") {
            tempPersonInfoModel.findOne({ "TempPersonId": uniqueId }, function (err, result) {
                if (err) {
                    res.statusCode = 500;
                    res.send(err);
                } else {
                    console.log("inside success");
                    res.send({
                        status: 200,
                        data: result
                    });
                }

            });

        } else {
            personInfoModel.findOne({ "PersonalUniqueueID": uniqueId }, function (err, result) {
                if (err) {
                    res.statusCode = 500;
                    res.send(err);
                } else {
                    console.log("inside success");
                    res.send({
                        status: 200,
                        data: result
                    });
                }

            });

        }


    },

    approveRejectAction: (req, res) => {
        console.log("inside approve reject action" + req.body.UserId);
        var userId = req.body.UserId;
        tempPersonInfoModel.findOne({ "UserId": userId }, { _id: 0, __v: 0, TempPersonId: 0 }).exec(function (err, result) {
            if (err) {
                console.log("err" + JSON.stringify(err));
                res.statusCode = 500;
                res.send({
                    status: response.statusCode,
                    error: err
                });
            }

            let personData = result;
            console.log("personS result" + JSON.stringify(personData));

            let formData = {
                "PersonalUniqueueID": new mongodb.ObjectID(),
                "UserId": personData.UserId,
                "FirstName": personData.FirstName,
                "MiddleName": personData.MiddleName,
                "LastName": personData.LastName,
                "Gender": personData.Gender,
                "DOB": personData.DOB,
                "Age": personData.Age,
                "FlatNumber": personData.FlatNumber,
                "SocietyName": personData.SocietyName,
                "StreetName": personData.StreetName,
                "City": personData.City,
                "State": personData.State,
                "Pincode": personData.Pincode,
                "PhoneNumber": personData.PhoneNumber,
                "MobileNumber": personData.MobileNumber,
                "PhysicalDisability": personData.PhysicalDisability,
                "MaritalStatus": personData.MaritalStatus,
                "EducationStatus": personData.EducationStatus,
                "BirthSign": personData.BirthSign
            };



            console.log("temp result" + formData);
            personInfoModel.create(formData, function (err, resultData) {
                if (err) {
                    console.log("err person" + JSON.stringify(err));
                    res.statusCode = 500;
                    res.send(err);
                } else {
                    tempPersonInfoModel.deleteOne({ UserId: userId }, function (err, obj) {
                        if (err) {
                            console.log("err temp delete" + JSON.stringify(err));
                            res.statusCode = 500;
                            res.send(err);
                        } else {
                            console.log("inside success");
                            res.send({
                                status: 200,
                                data: resultData
                            });
                        }
                    });

                }
            });
        });
    }
}