const { body, validationResult } = require('express-validator');

const validationRules = [
    body('email' , 'Email format is not correct').isEmail().custom(value => {
        if(!value.endsWith('@gmail.com')){
            throw new Error('Email must be of @gmail.com format');
        }
        return true;
    }),
    body('contact', 'Contact must be exactly 10 digits long')
        .matches(/^\d{10}$/)
]

const handleValidationErrors = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validationRules,
    handleValidationErrors
};