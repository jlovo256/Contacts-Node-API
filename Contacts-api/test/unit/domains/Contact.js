'use strict';

/* eslint-disable no-undef */
const path = require('path');
const appRoot = require('app-root-path').toString();

const Contact = require(path.join(appRoot, 'src/domain/Contacts/entities/Contact'));

const id = 157846;
const contactId = 156;
const createdAt = '2018-07-14T15:39:04.000Z';
const updatedAt = '2018-07-14T15:39:04.000Z';
const Names = [];
const Addresses = [];

module.exports = ((chai, expect) => {
  describe('Contact Domain', () => {

    describe('Contact Properties', () => {
      it('should have an id and dataValues', (done) => {
        try {
          const contact = new Contact(id,
            contactId,
            createdAt,
            updatedAt,
            Names,
            Addresses);
          expect(contact).to.have.property('id');
          expect(contact).to.have.property('dataValues');
          expect(contact.dataValues).to.have.property('contactId');
          expect(contact.dataValues).to.have.property('createdAt');
          expect(contact.dataValues).to.have.property('updatedAt');
          expect(contact.dataValues).to.have.property('Names');
          expect(contact.dataValues.Names).to.be.a('array');
          expect(contact.dataValues).to.have.property('Addresses');
          expect(contact.dataValues.Addresses).to.be.a('array');
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
});
