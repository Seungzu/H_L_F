const express = require('express')
const router = express.Router();

const controller = require('../controller/index.js')

router.post('/getWallet', controller.getWallet)
router.post('/enrollAdmin', controller.enrollAdmin)
router.post('/registUsers', controller.registUsers)

module.exports = router
