'use strict';

/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Entries', [
      {
        entry_id: 14287536,
        front_id: 1,
      },
      {
        entry_id: 46357682,
        front_id: 2,
      },
      {
        entry_id: 201564864,
        front_id: 3,
      },
      {
        entry_id: 297264238,
        front_id: 4,
      },
      {
        entry_id: 794222204,
        front_id: 5,
      },
      {
        entry_id: 1459703316,
        front_id: 6,
      },
      {
        entry_id: 3299585646,
        front_id: 7,
      },
      {
        entry_id: 3905762941,
        front_id: 8,
      },
    ], {})
      .then(() => {
        return queryInterface.bulkInsert('Names', [
          {
            name_id: 1,
            entry_id: 14287536,
            primary: true,
            honorific: null,
            first_name: 'Philip',
            middle_name: 'J.',
            last_name: 'Fry',
          },
          {
            name_id: 2,
            entry_id: 46357682,
            primary: true,
            honorific: null,
            first_name: 'Turanga',
            middle_name: null,
            last_name: 'Leela',
          },
          {
            name_id: 3,
            entry_id: 201564864,
            primary: true,
            honorific: 'Captain',
            first_name: 'Zapp',
            middle_name: 'T.',
            last_name: 'Brannigan',
          },
          {
            name_id: 4,
            entry_id: 297264238,
            primary: true,
            honorific: 'Dr.',
            first_name: 'Amy',
            middle_name: 'K.',
            last_name: 'Kroker',
          },
          {
            name_id: 5,
            entry_id: 297264238,
            primary: false,
            honorific: null,
            first_name: 'Amy',
            middle_name: 'K.',
            last_name: 'Wong',
          },
          {
            name_id: 6,
            entry_id: 794222204,
            primary: true,
            honorific: null,
            first_name: 'Bender',
            middle_name: 'Bending',
            last_name: 'Rodriguez',
          },
          {
            name_id: 7,
            entry_id: 1459703316,
            primary: true,
            honorific: null,
            first_name: 'Hermes',
            middle_name: 'J.',
            last_name: 'Conrad',
          },
          {
            name_id: 8,
            entry_id: 3299585646,
            primary: true,
            honorific: null,
            first_name: 'Hubert',
            middle_name: 'J.',
            last_name: 'Farnsworth',
          },
          {
            name_id: 9,
            entry_id: 3905762941,
            primary: true,
            honorific: 'Dr.',
            first_name: 'John',
            middle_name: 'A.',
            last_name: 'Zoidberg',
          },
        ], {});
      })
      .then(() => {
        return queryInterface.bulkInsert('Addresses', [
          {
            address_id: 1,
            entry_id: 14287536,
            primary: true,
            addressline1: 'Bender&apos;s Closet',
            addressline2: null,
            city: 'New New York',
            state: 'NY',
            zipcode: '123543',
            country: 'The Government of Earth',
          },
          {
            address_id: 2,
            entry_id: 14287536,
            primary: true,
            addressline1: 'A Better Place',
            addressline2: null,
            city: 'New New York',
            state: 'NY',
            zipcode: '123543',
            country: 'The Government of Earth',
          },
          {
            address_id: 3,
            entry_id: 14287536,
            primary: true,
            addressline1: 'An Even Better Place',
            addressline2: null,
            city: 'New New York',
            state: 'NY',
            zipcode: '123543',
            country: 'The Government of Earth',
          },
          {
            address_id: 4,
            entry_id: 14287536,
            primary: true,
            addressline1: 'Best Amazing Coolest Place Ever',
            addressline2: null,
            city: 'New New York',
            state: 'NY',
            zipcode: '123543',
            country: 'The Government of Earth',
          },
          {
            address_id: 5,
            entry_id: 46357682,
            primary: true,
            addressline1: 'Apt 1I',
            addressline2: 'Middle Street',
            city: 'New New York',
            state: 'NY',
            zipcode: '123543',
            country: 'The Government of Earth',
          },
          {
            address_id: 6,
            entry_id: 201564864,
            primary: true,
            addressline1: null,
            addressline2: null,
            city: null,
            state: null,
            zipcode: null,
            country: null,
          },
          {
            address_id: 7,
            entry_id: 297264238,
            primary: true,
            addressline1: 'Nice Apartment',
            addressline2: 'Wealthy Street',
            city: 'New New York',
            state: 'NY',
            zipcode: '123543',
            country: 'The Government of Earth',
          },
          {
            address_id: 8,
            entry_id: 794222204,
            primary: true,
            addressline1: 'Apartment-sized closet, Closet-sized apartment',
            addressline2: 'Robot Street',
            city: 'New New York',
            state: 'NY',
            zipcode: '123543',
            country: 'The Government of Earth',
          },
          {
            address_id: 9,
            entry_id: 1459703316,
            primary: true,
            addressline1: 'Apt B',
            addressline2: 'Stack of Domes',
            city: 'New New York',
            state: 'NY',
            zipcode: '123543',
            country: 'The Government of Earth',
          },
          {
            address_id: 10,
            entry_id: 3299585646,
            primary: true,
            addressline1: 'Fancy Lab',
            addressline2: null,
            city: 'New New York',
            state: 'NY',
            zipcode: '123543',
            country: 'The Government of Earth',
          },
          {
            address_id: 11,
            entry_id: 3905762941,
            primary: true,
            addressline1: 'Dumpster',
            addressline2: null,
            city: 'New New York',
            state: 'NY',
            zipcode: '123543',
            country: 'The Government of Earth',
          },
        ], {});
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Entries', [
      {
        entry_id: 14287536,
      },
      {
        entry_id: 46357682,
      },
      {
        entry_id: 201564864,
      },
      {
        entry_id: 297264238,
      },
      {
        entry_id: 794222204,
      },
      {
        entry_id: 1459703316,
      },
      {
        entry_id: 3299585646,
      },
      {
        entry_id: 3905762941,
      },
    ], {});
  },
};
