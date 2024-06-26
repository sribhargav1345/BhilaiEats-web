const { body, validationResult } = require("express-validator");

const validationRules = [
    body('options').isArray({ min:1 })
];

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
