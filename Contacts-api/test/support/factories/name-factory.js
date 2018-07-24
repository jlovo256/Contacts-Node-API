'use strict';

module.exports = ((factory, models) => {
  const Name = models.Names;

  factory.define('Name', Name, {
    nameId: factory.sequence('Name.nameId'),
    id: factory.sequence('name.id'),
    primary: factory.chance('boolean'),
    honorific: factory.chance('word'),
    firstName: factory.chance('name'),
    middleName: factory.chance('name'),
    lastName: factory.chance('name'),
  });
});
