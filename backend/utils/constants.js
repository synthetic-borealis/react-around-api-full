const urlRegex = /^https?:\/{2}(www\.)?[a-z\0-9]{2,256}\.[a-z]{2,6}(\/[a-z0-9._~:/?%#[\]@!$&'()*+,;=]*)?/i;

const responseMessages = {
  // Error Messages
  notFound: 'Requested resource not found',
  badRequest: 'Bad request',
  serverError: 'An error has occured on the server',
  unauthorized: 'Unauthorized user or action',
  // Other Responses
  cardDeleted: 'The card has been deleted',
};

module.exports = { urlRegex, responseMessages };
