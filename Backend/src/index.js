require('dotenv').config();
const cors = require('cors');
const express = require('express');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes * //

app.use('/api', routes.notifications);

// * Start * //

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
