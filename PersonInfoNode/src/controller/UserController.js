// 1. load express
var express = require("express");
// 2. define an instance of express
var instance = express();
var jwt = require("jsonwebtoken");
const loginStatusModel = require('../models/loginStatusModel');
const userModel = require('../models/userModel');
const tempPersonInfoModel = require('../models/tempPersonInfoModel');
const personInfoModel = require('../models/personInfoModel');

/* #region Login User and Generate Token */
//  the secret for the JWT 
var jwtSettings = {
    jwtSecret: "dbcsbiobc0708hdfcyesbombob"
};
// set the secret with express object 
instance.set("jwtSecret", jwtSettings.jwtSecret);
var mongodb = require('mongodb');
var jwt = require("jsonwebtoken");

/* #region Login User and Generate Token */
//  the secret for the JWT 
var jwtSettings = {
    jwtSecret: "dbcsbiobc0708hdfcyesbombob"
};

module.exports = {
    createUser: (req, res) => {
        console.log("inside create user");

        var userData = {
            UserId: new mongodb.ObjectID(),
            UserName: req.body.UserName,
            Email: req.body.Email,
            Password: req.body.Password,
            RoleId: req.body.RoleId
        }
        userModel.create(userData, function (err, result) {
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

    },

    getUserList: (req, res) => {
        console.log("inside get user list");

        var tokenRecived = req.headers.authorization.split(" ")[1];
        // 8b. verify the token 
        console.log("in authToken" + tokenRecived);
        jwt.verify(tokenRecived, instance.get("jwtSecret"), function (err, decoded) {
            if (err) {
                res.send({
                    success: false,
                    message: "Token verification failed"
                });
            } else {


                //GetUser details with actiondetails for Admin/Operator
                //Get User details and corresponding data from tempPersonInfo table
                userModel.aggregate([
                    {
                        $lookup:
                        {
                            from: 'TempPersonInfo',
                            localField: 'UserId',
                            foreignField: 'UserId',
                            as: 'tempPersonInfo',

                        }
                    },     // $unwind used for getting data in object or for one record only

                    // Join with user_role table
                    {
                        $lookup: {
                            from: "PersonInfo",
                            localField: "UserId",
                            foreignField: "UserId",
                            as: "personInfo"
                        }
                    },
                    {
                        $lookup: {
                            from: "Roles",
                            localField: "RoleId",
                            foreignField: "RoleId",
                            as: "roles"
                        }
                    }, { $project: { UserId: 1, UserName: 1, RoleId: 1, RoleName: '$roles.RoleName', Email: 1, TempPersonId: '$tempPersonInfo.TempPersonId', PersonUniqueId: '$personInfo.PersonalUniqueueID' } }
                ]).exec(function (err, resultData) {
                    if (err) throw err;


                    console.log(JSON.stringify(resultData));
                    res.send({
                        status: 200,
                        data: resultData
                    });
                });


            }
        })


    }
}