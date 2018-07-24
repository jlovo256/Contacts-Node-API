'use strict';

/* eslint-disable no-undef */
const path = require('path');
const appRoot = require('app-root-path').toString();

const Entry = require(path.join(appRoot, 'src/domain/Contacts/entities/Entry'));

const id = 157846;
const entryId = 156;
const createdAt = '2018-07-14T15:39:04.000Z';
const updatedAt = '2018-07-14T15:39:04.000Z';
const Names = [];
const Addresses = [];

module.exports = ((chai, expect) => {
  describe('Entry Domain', () => {

    describe('Entry Properties', () => {
      it('should have an id and dataValues', (done) => {
        try {
          const entry = new Entry(id,
            entryId,
            createdAt,
            updatedAt,
            Names,
            Addresses);
          expect(entry).to.have.property('id');
          expect(entry).to.have.property('dataValues');
          expect(entry.dataValues).to.have.property('entryId');
          expect(entry.dataValues).to.have.property('createdAt');
          expect(entry.dataValues).to.have.property('updatedAt');
          expect(entry.dataValues).to.have.property('Names');
          expect(entry.dataValues.Names).to.be.a('array');
          expect(entry.dataValues).to.have.property('Addresses');
          expect(entry.dataValues.Addresses).to.be.a('array');
          done();
        } catch (err) {
          done(err);
        }
      });
    });

  });
});
