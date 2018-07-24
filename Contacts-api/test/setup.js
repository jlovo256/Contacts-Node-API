'use strict';

/**
 * The main entry point for testing
 * Start server for testing
 * @author Jamie Tudor
 */

const chai = require('chai'); /* eslint-disable-line import/order */
const chaiHttp = require('chai-http'); // middleware for testing server
const chaiThings = require('chai-things'); // middleware for testing arrays

chai.use(chaiHttp);
chai.use(chaiThings);
