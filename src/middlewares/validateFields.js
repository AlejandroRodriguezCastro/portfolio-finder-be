const { validationResult } = require('express-validator');

const checkFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array(),
            });
    } else {
        next();
    }
};

module.exports = checkFields;