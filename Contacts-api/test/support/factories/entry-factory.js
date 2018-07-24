'use strict';

module.exports = ((factory, models) => {
  const Entry = models.Entries;

  factory.define('Entry', Entry, {
    id: factory.sequence('Entry.id'),
    entryId: factory.sequence('Entry.entryId'),
  });
});

//factory.build('Entry').then(user => console.log(user));
