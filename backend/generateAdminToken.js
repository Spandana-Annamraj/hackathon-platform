// generateAdminToken.js
const jwt = require('jsonwebtoken');

const payload = {
  userId: 'admin1234567890', // example admin userId, replace if needed
  role: 'admin'
};

const secret = 'secretkey'; // your JWT_SECRET from .env

const token = jwt.sign(payload, secret);

console.log('Admin token (never expires):');
console.log(token);
