const { Router } = require('express');
const userController = require('../controllers/user.controller');
const checkFields = require('../middlewares/validateFields');
const { check } = require('express-validator');
const router = Router();


router.get('/', userController.getUsers);

router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').not().isEmpty(),
        check('password', 'The password is required').not().isEmpty(),
        checkFields,
    ],
    userController.createUser);

module.exports = router;