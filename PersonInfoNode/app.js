const express = require('express')
const app = express();
const routes = require('./src/api')
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");



app.use(bodyParser.urlencoded({
    extended: false
}));
// 3d.2 use the json() parser for body-Parser
app.use(bodyParser.json());

// 3e. configure cors() for the express
app.use(cors());

app.get('/', (req, res) =>{
	res.send('Hello world!!')
})

// app.use('/roles', (req, res, next) =>{
// 	console.log('Roles route called')
// 	next()
// })

app.use(routes);

mongoose.connect(
    "mongodb://localhost/PersonInformation", {
        useNewUrlParser: true
    }
);

var dbConnect = mongoose.connection;
if (!dbConnect) {
    console.log("Sorry Connection is not established");
    return;
}else{
	console.log("connected");
}

app.listen(5050, ()=>{
	console.log('app running');
})