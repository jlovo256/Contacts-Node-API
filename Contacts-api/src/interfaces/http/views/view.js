'use strict';

const xmlBuild = require('./xml');

const view = ((req, res, results, type) => {
  /* eslint-disable func-names */
  res.format({
    'text/plain': function () {
      res.statusCode = type;
      return res.send(results);
    },
    'text/xml': function () {
      res.statusCode = type;
      return res.send(xmlBuild(results));
    },
    'application/json': function () {
      res.statusCode = type;
      return res
        .json(results);
    },
    default() {
      res.statusCode = 406;
      return res.send('Not Acceptable');
    },
  });
  /* eslint-enable func-names */
});
module.exports.view = view;
