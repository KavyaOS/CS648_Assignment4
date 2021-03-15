/* eslint linebreak-style: ["error","windows"] */
/* eslint no-restricted-globals: "off" */

const express = require('express');
require('dotenv').config();
const { connectToDb } = require('./db');
const { installHandler } = require('./api_handler');

const app = express();
installHandler(app);

const port = process.env.API_SERVER_PORT || 3000;

(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (error) {
    console.log('Error:', error);
  }
}());
