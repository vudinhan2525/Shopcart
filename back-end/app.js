const express = require('express');
const app = express();
app.get('/', (req, res, next) => {
  res.status(200).json({ res: 'Hello from the server' });
});
module.exports = app;
