const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();


router.route('/').get(async (req, res) => {
    res.json(await userController.getUsers());
});

router.route('/').post(async (req, res) => {
    res.send(await userController.createUser(req.body));
});
//post(validate(userValidation.createUser), userController.createUser).get(validate(userValidation.createUser),userController.getUsers);

module.exports = router;