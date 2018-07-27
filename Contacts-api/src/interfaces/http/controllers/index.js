'use strict';

/**
 * @module helloContacts
 * CHANGE ME, if you use this for something besides jamietudor.me
 * There doesn't seem to be a straightforward way to get the url in node,
 * if it is being proxied.  If you know a way, I would love to hear about it.
 * @param {Object} req
 * @param {Object} res
 */
function helloContacts(req, res) {
  res.set('Content-Type', 'text/plain');
  if (process.env.NODE_ENV === 'development') {
    res.status(200).send(`Contacts API is listening on ${process.env.HOST}:${process.env.PORT}`);
  } else {
    res.status(200).send('Contacts API is listening on https://jamietudor.me/api/v1.0');
  }
}
module.exports.helloContacts = helloContacts;

//// connect models to controllers, export controllers
//module.exports.ContactController = require('./contactController')(Repos.ContactRepo);
//module.exports.NameController = require('./nameController')(Repos.NameRepo);
//module.exports.AddressController = require('./addressController')(Repos.AddressRepo);
