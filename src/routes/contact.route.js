const express = require('express');
const contactController = require('../controllers/contact.controller');
const router = express.Router();

router.route('/').get(async (req, res) => {
    res.json(await contactController.getContacts());
});

router.route('/').post(async (req, res) => {
    res.send(await contactController.createContact(req.body));
});

module.exports = router;
