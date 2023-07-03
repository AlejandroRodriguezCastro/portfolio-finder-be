const express = require('express');
const contactController = require('../controllers/contact.controller');
const checkFields = require('../middlewares/validateFields');
const { check } = require('express-validator');
const router = express.Router();
const jwtValidator = require('../middlewares/jwtValidator');

router.get('/',jwtValidator, contactController.getContacts);

router.get('/:id',jwtValidator, contactController.getContactById);

router.post('/',[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('phone', 'The phone is required').not().isEmpty(),
    check('message', 'The message is required').not().isEmpty(),
    checkFields,
],
contactController.createContact);

router.put('/:id',[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('phone', 'The phone is required').not().isEmpty(),
    check('message', 'The message is required').not().isEmpty(),
    checkFields,
] ,jwtValidator, contactController.updateContact);

router.delete('/:id',jwtValidator, contactController.deleteContact);

module.exports = router;