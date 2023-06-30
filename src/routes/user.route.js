const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');


router.route('/').post(validate(userValidation.createUser), userController.createUser).get(validate(userValidation.createUser),userController.getUsers);

module.exports = router;