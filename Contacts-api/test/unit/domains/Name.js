'use strict';

/* eslint-disable no-undef */
const path = require('path');
const appRoot = require('app-root-path').toString();

const Name = require(path.join(appRoot, 'src/domain/Contacts/entities/Name'));

const id = 157846;
const nameId = 16;
const primary = true;
const honorific = null;
const firstName = 'Philip';
const middleName = 'J.';
const lastName = 'Fry';
const createdAt = '2018-07-14T15:39:04.000Z';
const updatedAt = '2018-07-14T15:39:04.000Z';

module.exports = ((chai, expect) => {
  describe('Name Domain', () => {

    describe('Name Properties', () => {
      it('should have an id and dataValues', (done) => {
        try {
          const name = new Name(id,
            nameId,
            primary,
            honorific,
            firstName,
            middleName,
            lastName,
            createdAt,
            updatedAt);
          expect(name).to.have.property('id');
          expect(name).to.have.property('dataValues');
          expect(name.dataValues).to.have.property('nameId');
          expect(name.dataValues).to.have.property('primary');
          expect(name.dataValues).to.have.property('honorific');
          expect(name.dataValues).to.have.property('firstName');
          expect(name.dataValues).to.have.property('middleName');
          expect(name.dataValues).to.have.property('lastName');
          expect(name.dataValues).to.have.property('createdAt');
          expect(name.dataValues).to.have.property('updatedAt');
          done();
        } catch (err) {
          done(err);
        }
      });
    });

  });
});
