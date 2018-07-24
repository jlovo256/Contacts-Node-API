'use strict';

/* eslint-disable no-undef */

module.exports = ((server, chai, expect) => {

  describe('Addresses', () => {

    describe('/POST Create Address text/plain', () => {
      it('create an address', (done) => {
        chai.request(server)
          .post('/api/v1.0/contacts/1/addresses')
          .set('Accept', 'text/plain')
          .send({
            "addressL1": "Best Amazing Coolest Place Ever",
            "addressL2": null,
            "city": "New New York",
            "state": "NY",
            "zipcode": "12348",
            "country": "The Government of Earth",
            "primary": false
          })
          .then((res) => {
            expect(res).to.have.status(201);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('addressId');
            expect(res.text).to.contain('primary');
            expect(res.text).to.contain('addressL1');
            expect(res.text).to.contain('addressL2');
            expect(res.text).to.contain('city');
            expect(res.text).to.contain('state');
            expect(res.text).to.contain('zipcode');
            expect(res.text).to.contain('country');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/POST Create Address application/json', () => {
      it('create an address', (done) => {
        chai.request(server)
          .post('/api/v1.0/contacts/1/addresses')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({
            "addressL1": "Best Amazing Coolest Place Ever",
            "addressL2": null,
            "city": "New New York",
            "state": "NY",
            "zipcode": "12348",
            "country": "The Government of Earth",
            "primary": false
          })
          .then((res) => {
            expect(res).to.have.status(201);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body');
            expect(res.body).to.have.keys(
              'addressId',
              'primary',
              'addressL1',
              'addressL2',
              'city',
              'state',
              'zipcode',
              'country',
              'createdAt',
              'updatedAt'
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Select All Addresses Per Entry text/plain', () => {
      it('gets all addresses associated with the entry', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1/addresses')
          .set('Accept', 'text/plain')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('addressId');
            expect(res.text).to.contain('primary');
            expect(res.text).to.contain('addressL1');
            expect(res.text).to.contain('addressL2');
            expect(res.text).to.contain('city');
            expect(res.text).to.contain('state');
            expect(res.text).to.contain('zipcode');
            expect(res.text).to.contain('country');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Select All Addresses Per Entry application/json', () => {
      it('gets all addresses associated with the entry', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1/addresses')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body')
              .that.is.an('array');
            expect(res.body).to.all.have.property('addressId');
            expect(res.body).to.all.have.property('primary');
            expect(res.body).to.all.have.property('addressL1');
            expect(res.body).to.all.have.property('addressL2');
            expect(res.body).to.all.have.property('city');
            expect(res.body).to.all.have.property('state');
            expect(res.body).to.all.have.property('zipcode');
            expect(res.body).to.all.have.property('country');
            expect(res.body).to.all.have.property('createdAt');
            expect(res.body).to.all.have.property('updatedAt');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/PUT Address', () => {
      it('should return 405 status and Allow Header', (done) => {
        chai.request(server)
          .put('/api/v1.0/contacts/1/addresses')
          .then((res) => {
            expect(res).to.have.status(405);
            expect(res.header).to.have.property('allow');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Select Address text/plain', () => {
      it('should get the address', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1/addresses/1')
          .set('Accept', 'text/plain')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('addressId');
            expect(res.text).to.contain('primary');
            expect(res.text).to.contain('addressL1');
            expect(res.text).to.contain('addressL2');
            expect(res.text).to.contain('city');
            expect(res.text).to.contain('state');
            expect(res.text).to.contain('zipcode');
            expect(res.text).to.contain('country');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Select Address application/json', () => {
      it('should get the address', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1/addresses/1')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body');
            expect(res.body).to.have.keys(
              'addressId',
              'primary',
              'addressL1',
              'addressL2',
              'city',
              'state',
              'zipcode',
              'country',
              'createdAt',
              'updatedAt'
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/PUT Update Address text/plain', () => {
      it('should update the address', (done) => {
        chai.request(server)
          .put('/api/v1.0/contacts/1/addresses/4')
          .set('Accept', 'text/plain')
          .send({
            "addressL1": "Best Amazing Coolest Place Ever",
            "addressL2": "Swanky Apt",
            "city": "New New York",
            "state": "NY",
            "zipcode": "12348",
            "country": "The Government of Earth",
            "primary": false
          })
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('addressId');
            expect(res.text).to.contain('primary');
            expect(res.text).to.contain('addressL1');
            expect(res.text).to.contain('addressL2');
            expect(res.text).to.contain('city');
            expect(res.text).to.contain('state');
            expect(res.text).to.contain('zipcode');
            expect(res.text).to.contain('country');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/PUT Update Address application/json', () => {
      it('should update the address', (done) => {
        chai.request(server)
          .put('/api/v1.0/contacts/8/addresses/11')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({
            "addressL1": "Dumpster with Mat",
            "addressL2": null,
            "city": "New New York",
            "state": "NY",
            "zipcode": "12348",
            "country": "The Government of Earth",
            "primary": true
          })
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body');
            expect(res.body).to.have.keys(
              'addressId',
              'primary',
              'addressL1',
              'addressL2',
              'city',
              'state',
              'zipcode',
              'country',
              'createdAt',
              'updatedAt'
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/DELETE Delete Address', () => {
      it('should delete the address');
    });

    describe('/POST Address', () => {
      it('should return 405 status and Allow Header', (done) => {
        chai.request(server)
          .post('/api/v1.0/contacts/1/addresses/1')
          .then((res) => {
            expect(res).to.have.status(405);
            expect(res.header).to.have.property('allow');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
