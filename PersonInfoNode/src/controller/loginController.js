// 1. load express
var express = require("express");
// 2. define an instance of express
var instance = express();
var jwt = require("jsonwebtoken");
const loginStatusModel = require('../models/loginStatusModel');
const userModel = require('../models/userModel');

/* #region Login User and Generate Token */
//  the secret for the JWT 
var jwtSettings = {
    jwtSecret: "dbcsbiobc0708hdfcyesbombob"
};
// set the secret with express object 
instance.set("jwtSecret", jwtSettings.jwtSecret);
var mongodb = require('mongodb');

module.exports = {
    login: (req, res) => {

        var user = {
            UserName: req.body.UserName,
            Password: req.body.Password
        };

        console.log("In Auth User " + JSON.stringify(user));
        userModel.aggregate([{ $match: { UserName: req.body.UserName } },
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
        }, { $project: { UserId: 1, UserName: 1, RoleId: 1, RoleName: '$roles.RoleName', Email: 1, Password: 1, PersonUniqueId: '$personInfo.PersonalUniqueueID' } }
        ]).exec(function (err, usr) {

            if (err) {
                console.log("Some error occured ");
                throw error;
            }
            // 7a. if user not found the respond error 
            if (!usr) {
                res.send({
                    statusCode: 404,
                    message: "Sorry! User is not available"
                });
            } else if (usr) {
                let userData = usr[0];
                // 7b. user is available but password not match the 
                // respond error 
                console.log("In else if " + JSON.stringify(userData));
                if (userData.Password != userData.Password) {
                    res.send({
                        statusCode: 404,
                        message: "Sorry!User Name and Password does not match"
                    });
                } else {
                    let loginStatus = req.body.loginStatus;
                    loginStatus.LoginStatusId = new mongodb.ObjectID();
                    loginStatusModel.create(loginStatus, function (err, result) {
                        if (err) {
                            res.statusCode = 500;
                            res.send(err);
                        } else {
                            // 7c. sing-In the user and generate token 
                            var token = jwt.sign({
                                userData
                            }, instance.get("jwtSecret"), {
                                    expiresIn: 3600
                                });
                            // save token globally 
                            //tokenStore = token;
                            res.send({
                                statusCode: 200,
                                authenticated: true,
                                message: "Login Successfully",
                                token: token,
                                user: userData
                            });
                        }

                    });


                }
            }
        });
    }
}