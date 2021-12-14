const fs = require('fs');
const crypto = require('crypto');

const NODE_ENV = process.argv[2] && process.argv[2] ? process.argv[2] : 'production';
const JWT_SECRET = crypto.randomBytes(16).toString('hex');

const envConfiguration = `NODE_ENV=${NODE_ENV}\nJWT_SECRET=${JWT_SECRET}`;

try {
  fs.writeFileSync('./.env', envConfiguration);
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
