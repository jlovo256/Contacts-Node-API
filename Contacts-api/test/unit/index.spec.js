'use strict';

// testers
const chai = require('chai'); /* eslint-disable-line import/order */
const chaiThings = require('chai-things'); // middleware for testing arrays

chai.use(chaiThings);

const { expect } = chai;


/* eslint-disable */

describe('Contact-api Unit Tests', function () {
  require('./domains/Entry')(chai, expect);
  require('./domains/Name')(chai, expect);
  require('./domains/Address')(chai, expect);
});
/* eslint-enable */
