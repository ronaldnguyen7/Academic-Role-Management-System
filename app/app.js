const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const roleRoutes = require('./routes/roleRoutes.js');
const reviewRoutes = require('./routes/reviewRoute.js');
const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/reviews', reviewRoutes);

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

module.exports = app;