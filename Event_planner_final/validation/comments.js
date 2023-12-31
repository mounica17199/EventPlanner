const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.body = validText(data.body) ? data.body : '';

  data.username = validText(data.username) ? data.username : '';
  // Validate body
  
  if (Validator.isEmpty(data.body)) {
    errors.body = 'Body field is required'; 
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};