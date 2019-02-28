const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');

router.post('/', controller.createUser);
router.get('/', controller.getUserList);

module.exports = router;