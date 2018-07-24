'use strict';

const builder = require('xmlbuilder');
/**
 * This is a bit nasty, but it's xml
 * Note: The weakness is that it assumes the array consists of all the same
 * type of object
 * @param {any} results
 */
const xmlBuild = ((results) => {
  if (!Array.isArray(results)) {
    const feedObj = {}; // this object will hold the cleaned JS object

    // get the property name for xml from the metadata
    const prop = results.nameSingular;

    // convert to string and then to json obj removes metadata
    const jString = JSON.stringify(results);
    feedObj[prop] = JSON.parse(jString);

    // feed the object to the xml builder
    const feed = builder.create(feedObj, { encoding: 'utf-8' });
    return feed.end({ pretty: true });
  }

  const feedObj = {}; // this object will hold the data without its outer property
  const biggerObj = {}; // use this to add an outer property for xml

  const prop = results[0].nameSingular; // the single array name
  const propP = results[0].namePlural; // the plural name

  // convert to string and then to json obj removes metadata
  const jString = JSON.stringify(results);
  feedObj[prop] = JSON.parse(jString);
  biggerObj[propP] = feedObj; // add property with plural name

  // feed the object to the xml builder
  const feed = builder.create(biggerObj, { encoding: 'utf-8' });
  return feed.end({ pretty: true });
});
module.exports = xmlBuild;
