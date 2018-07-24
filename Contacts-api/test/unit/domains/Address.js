'use strict';

/* eslint-disable no-undef */
const path = require('path');
const appRoot = require('app-root-path').toString();

const Address = require(path.join(appRoot, 'src/domain/Contacts/entities/Address'));

const id = 157846;
const addressId = 156;
const primary = true;
const addressL1 = 'A Better Place';
const addressL2 = null;
const city = 'New New York';
const state = 'NY';
const zipcode = '123543';
const country = 'The Government of Earth';
const createdAt = '2018-07-14T15:39:04.000Z';
const updatedAt = '2018-07-14T15:39:04.000Z';

module.exports = ((chai, expect) => {
  describe('Address Domain', () => {

    describe('Address Properties', () => {
      it('should have an id and dataValues', (done) => {
        try {
          const address = new Address(id,
            addressId,
            primary,
            addressL1,
            addressL2,
            city,
            state,
            zipcode,
            country,
            createdAt,
            updatedAt);
          expect(address).to.have.property('id');
          expect(address).to.have.property('dataValues');
          expect(address.dataValues).to.have.property('addressId');
          expect(address.dataValues).to.have.property('primary');
          expect(address.dataValues).to.have.property('addressL1');
          expect(address.dataValues).to.have.property('addressL2');
          expect(address.dataValues).to.have.property('city');
          expect(address.dataValues).to.have.property('state');
          expect(address.dataValues).to.have.property('zipcode');
          expect(address.dataValues).to.have.property('country');
          expect(address.dataValues).to.have.property('createdAt');
          expect(address.dataValues).to.have.property('updatedAt');
          done();
        } catch (err) {
          done(err);
        }
      });
    });

  });
});
