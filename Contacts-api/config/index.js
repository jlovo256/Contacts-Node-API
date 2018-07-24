'use strict';

require('dotenv').config(); // This module makes getting the .env easy

const host = process.env.HOST || 'http://localhost/';
const port = process.env.PORT || 1337;
const baseUrl = `${host}:${port}`;

const config = {
  host,
  port,
  baseUrl,
};

module.exports = config;
