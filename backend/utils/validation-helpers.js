const validator = require('validator');

const validateUrl = (string) => (validator.isURL(string) ? string : '');

module.exports = { validateUrl };
