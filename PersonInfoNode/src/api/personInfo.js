const express = require('express')
const router = express.Router();
const controller = require('../controller/personInfoController')
const personInfoModelModel = require('../models/personInfoModel');

router.get('/', controller.getPersonInfo);
router.post('/addEdit', controller.addEditPersonInfo);
router.post('/action', controller.approveRejectAction);


module.exports = router;