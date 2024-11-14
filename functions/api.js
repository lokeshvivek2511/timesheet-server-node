const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Your existing routes go here, but with '/.netlify/functions/api' prefix
// Example:
app.get('/.netlify/functions/api/users', (req, res) => {
  // Your user handling logic
});

// Export the handler
module.exports.handler = serverless(app);
