'use strict';

/* eslint-disable no-console, no-shadow, no-unused-vars */
const pm2 = require('pm2');

// No cluster stuff has been added, but it goes here
pm2.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  pm2.start({
    script: 'index.js',
  }, (err, apps) => {
    pm2.disconnect();
    if (err) { throw err; }
  });
});
