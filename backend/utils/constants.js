const urlRegex = /^https?:\/{2}(www\.)?[a-z\0-9]{2,256}\.[a-z]{2,6}(\/[a-z0-9._~:/?%#[\]@!$&'()*+,;=]*)?/i;

const messageStrings = {
  // Error Messages
  badCredentials: 'Incorrect email or password',
  notFound: 'Requested resource not found',
  badRequest: 'Bad request',
  serverError: 'An error has occured on the server',
  unauthorized: 'Unauthorized action',
  // Other Responses
  cardDeleted: 'The card has been deleted',
};

const tempSecretKey = 'some-secret-key';

module.exports = { urlRegex, messageStrings, tempSecretKey };
