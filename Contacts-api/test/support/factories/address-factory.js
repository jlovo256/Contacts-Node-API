'use strict';

module.exports = ((factory, models) => {
  const Address = models.Addresses;

  factory.define('Address', Address, {
    addressId: factory.sequence('Address.addressId'),
    id: factory.sequence('Address.id'),
    primary: factory.chance('boolean'),
    addressL1: factory.chance('address'),
    addressL2: factory.chance('street'),
    city: factory.chance('city', { country: 'us' }),
    state: factory.chance('state', { country: 'us' }),
    zipcode: factory.chance('zipcode'),
    country: 'USA',
  });
});
