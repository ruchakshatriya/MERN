const roleModel = require('../models/roleModel');

module.exports = {
   createRole: (req, res) => {
    console.log("req fpor role"+req.body.RoleId);

    roleModel.create(req.body, function (err, result) {
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
    getroles: (req, res) => {
        console.log("req fpor role"+req.body.RoleId);
    
        roleModel.find().exec(function (err, result) {
            if (err) {
                res.statusCode = 500;
                res.send({
                    status: response.statusCode,
                    error: err
                });
            }
            res.send({
                status: 200,
                data: result
            });
        });
            
        } 
}