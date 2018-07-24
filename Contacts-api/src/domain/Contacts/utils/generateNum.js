'use strict';

/**
 * Used to generate a random ID for the database when creating a new
 * entry
 * @return {integer}
 * */
const generateRandomID = (() => {
  return Math.floor(Math.random() * 4294967295) + 1;
});
module.exports.generateRandomID = generateRandomID;
