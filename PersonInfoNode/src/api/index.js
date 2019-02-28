const express = require('express')
const router = express.Router();
const rolesRoutes = require('./roles');
const usersRoutes = require('./users');
const personInfoRoutes = require('./personInfo');
const loginController = require('../controller/loginController');

router.use('/roles', rolesRoutes);
router.post('/login', loginController.login);
router.use('/user', usersRoutes);
router.use('/personinfo', personInfoRoutes);



module.exports = router;