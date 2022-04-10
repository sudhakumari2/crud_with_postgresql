const express = require('express');
const router = express.Router()
const usercontroller = require('../controller/user')
router.post('/create-user', usercontroller.create);
router.get('/get-data', usercontroller.getdata)
router.put('/update-data/:userId', usercontroller.update_data)
router.delete('/delete-data/:userId', usercontroller.delete_data)
module.exports = router;

