const express = require('express')
const router = express.Router();
const controller = require('../controller/roleController');

router.post('/', controller.createRole);
router.get('/', controller.getroles);

module.exports = router;