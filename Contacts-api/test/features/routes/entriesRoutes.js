'use strict';

/* eslint-disable no-undef */

module.exports = ((server, chai, expect) => {
  describe('Entries Routes', () => {
    describe('/GET Contact List text/plain', () => {
      it('should get all the contacts', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts')
          .set('Accept', 'text/plain')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('entryId');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            expect(res.text).to.contain('Names');
            expect(res.text).to.contain('nameId');
            expect(res.text).to.contain('honorific');
            expect(res.text).to.contain('firstName');
            expect(res.text).to.contain('middleName');
            expect(res.text).to.contain('lastName');
            expect(res.text).to.contain('Addresses');
            expect(res.text).to.contain('addressId');
            expect(res.text).to.contain('addressL1');
            expect(res.text).to.contain('addressL2');
            expect(res.text).to.contain('city');
            expect(res.text).to.contain('state');
            expect(res.text).to.contain('zipcode');
            expect(res.text).to.contain('country');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Contact List application/json', () => {
      it('should get all the contacts', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts')
          .set('Accept', 'application/json')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body');
            expect(res.body).to.be.a('array');
            expect(res.body).to.all.have.property('entryId');
            expect(res.body).to.all.have.property('createdAt');
            expect(res.body).to.all.have.property('updatedAt');
            expect(res.body).to.all.have.property('Names')
              .that.is.an('array');
            res.body.forEach((entry) => {
              expect(entry.Names).to.all.have.property('nameId');
              expect(entry.Names).to.all.have.property('honorific');
              expect(entry.Names).to.all.have.property('firstName');
              expect(entry.Names).to.all.have.property('middleName');
              expect(entry.Names).to.all.have.property('lastName');
            });
            expect(res.body).to.all.have.property('Addresses')
              .that.is.an('array');
            res.body.forEach((entry) => {
              expect(entry.Addresses).to.all.have.property('addressId');
              expect(entry.Addresses).to.all.have.property('addressL1');
              expect(entry.Addresses).to.all.have.property('addressL2');
              expect(entry.Addresses).to.all.have.property('city');
              expect(entry.Addresses).to.all.have.property('state');
              expect(entry.Addresses).to.all.have.property('zipcode');
              expect(entry.Addresses).to.all.have.property('country');
            });
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Contact List text/xml', () => {
      it('should get all the contacts', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts')
          .set('Accept', 'text/xml')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/xml; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('entryId');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            expect(res.text).to.contain('Names');
            expect(res.text).to.contain('nameId');
            expect(res.text).to.contain('honorific');
            expect(res.text).to.contain('firstName');
            expect(res.text).to.contain('middleName');
            expect(res.text).to.contain('lastName');
            expect(res.text).to.contain('Addresses');
            expect(res.text).to.contain('addressId');
            expect(res.text).to.contain('addressL1');
            expect(res.text).to.contain('addressL2');
            expect(res.text).to.contain('city');
            expect(res.text).to.contain('state');
            expect(res.text).to.contain('zipcode');
            expect(res.text).to.contain('country');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/POST Create Entry text/plain', () => {
      it('create an entry', (done) => {
        chai.request(server)
          .post('/api/v1.0/contacts')
          .set('Accept', 'text/plain')
          .send({
            "Names": [
              {
                "honorific": null,
                "firstName": "Philip",
                "middleName": "J.",
                "lastName": "Fry"
              }
            ],
            "Addresses": [
              {
                "addressL1": "Glorious Mansion",
                "addressL2": null,
                "city": "New New York",
                "state": "NY",
                "zipcode": "12348",
                "country": "The Government of Earth"
              }
            ]
          })
          .then((res) => {
            expect(res).to.have.status(201);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res.header).to.have.property('location');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('entryId');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            expect(res.text).to.contain('Names');
            expect(res.text).to.contain('nameId');
            expect(res.text).to.contain('honorific');
            expect(res.text).to.contain('firstName');
            expect(res.text).to.contain('middleName');
            expect(res.text).to.contain('lastName');
            expect(res.text).to.contain('Addresses');
            expect(res.text).to.contain('addressId');
            expect(res.text).to.contain('addressL1');
            expect(res.text).to.contain('addressL2');
            expect(res.text).to.contain('city');
            expect(res.text).to.contain('state');
            expect(res.text).to.contain('zipcode');
            expect(res.text).to.contain('country');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/POST Create Entry application/json', () => {
      it('create an entry', (done) => {
        chai.request(server)
          .post('/api/v1.0/contacts')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({
            "Names": [
              {
                "honorific": null,
                "firstName": "Philip",
                "middleName": "J.",
                "lastName": "Fry"
              }
            ],
            "Addresses": [
              {
                "addressL1": "Bender's Closet",
                "addressL2": null,
                "city": "New New York",
                "state": "NY",
                "zipcode": "12348",
                "country": "The Government of Earth"
              }
            ]
          })
          .then((res) => {
            expect(res).to.have.status(201);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res.header).to.have.property('location');
            expect(res).to.have.property('body');
            expect(res.body).to.have.property('entryId');
            expect(res.body).to.have.property('createdAt');
            expect(res.body).to.have.property('updatedAt');
            expect(res.body).to.have.property('Names')
              .that.is.an('array');
            expect(res.body.Names).to.all.have.property('nameId');
            expect(res.body.Names).to.all.have.property('honorific');
            expect(res.body.Names).to.all.have.property('firstName');
            expect(res.body.Names).to.all.have.property('middleName');
            expect(res.body.Names).to.all.have.property('lastName');
            expect(res.body).to.have.property('Addresses')
              .that.is.an('array');
            expect(res.body.Addresses).to.all.have.property('addressId');
            expect(res.body.Addresses).to.all.have.property('addressL1');
            expect(res.body.Addresses).to.all.have.property('addressL2');
            expect(res.body.Addresses).to.all.have.property('city');
            expect(res.body.Addresses).to.all.have.property('state');
            expect(res.body.Addresses).to.all.have.property('zipcode');
            expect(res.body.Addresses).to.all.have.property('country');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/PUT Api Entries', () => {
      it('should return 405 status and Allow Header', (done) => {
        chai.request(server)
          .put('/api/v1.0/contacts')
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

    describe('/GET Entry Default text/plain', () => {
      it('should get the entry with associated objects', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1')
          .set('Accept', 'text/plain')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('entryId');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            expect(res.text).to.contain('Names');
            expect(res.text).to.contain('nameId');
            expect(res.text).to.contain('honorific');
            expect(res.text).to.contain('firstName');
            expect(res.text).to.contain('middleName');
            expect(res.text).to.contain('lastName');
            expect(res.text).to.contain('Addresses');
            expect(res.text).to.contain('addressId');
            expect(res.text).to.contain('addressL1');
            expect(res.text).to.contain('addressL2');
            expect(res.text).to.contain('city');
            expect(res.text).to.contain('state');
            expect(res.text).to.contain('zipcode');
            expect(res.text).to.contain('country');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Entry Default text/xml', () => {
      it('should get the entry with associated objects', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1')
          .set('Accept', 'text/xml')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/xml; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('entryId');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            expect(res.text).to.contain('Names');
            expect(res.text).to.contain('nameId');
            expect(res.text).to.contain('honorific');
            expect(res.text).to.contain('firstName');
            expect(res.text).to.contain('middleName');
            expect(res.text).to.contain('lastName');
            expect(res.text).to.contain('Addresses');
            expect(res.text).to.contain('addressId');
            expect(res.text).to.contain('addressL1');
            expect(res.text).to.contain('addressL2');
            expect(res.text).to.contain('city');
            expect(res.text).to.contain('state');
            expect(res.text).to.contain('zipcode');
            expect(res.text).to.contain('country');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Entry Default application/json', () => {
      it('should get the entry with associated objects', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1')
          .set('Accept', 'application/json')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body');
            expect(res.body).to.have.property('entryId');
            expect(res.body).to.have.property('createdAt');
            expect(res.body).to.have.property('updatedAt');
            expect(res.body).to.have.property('Names')
              .that.is.an('array');
            expect(res.body.Names).to.all.have.property('nameId');
            expect(res.body.Names).to.all.have.property('honorific');
            expect(res.body.Names).to.all.have.property('firstName');
            expect(res.body.Names).to.all.have.property('middleName');
            expect(res.body.Names).to.all.have.property('lastName');
            expect(res.body).to.have.property('Addresses')
              .that.is.an('array');
            expect(res.body.Addresses).to.all.have.property('addressId');
            expect(res.body.Addresses).to.all.have.property('addressL1');
            expect(res.body.Addresses).to.all.have.property('addressL2');
            expect(res.body.Addresses).to.all.have.property('city');
            expect(res.body.Addresses).to.all.have.property('state');
            expect(res.body.Addresses).to.all.have.property('zipcode');
            expect(res.body.Addresses).to.all.have.property('country');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/POST Api Entries/:id', () => {
      it('should return 405 status and Allow Header', (done) => {
        chai.request(server)
          .post('/api/v1.0/contacts/1')
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

    describe('/GET Entry Detail text/plain', () => {
      it('should get the entry with primary associations', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1/primary')
          .set('Accept', 'text/plain')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('entryId');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            expect(res.text).to.contain('Names');
            expect(res.text).to.contain('nameId');
            expect(res.text).to.contain('honorific');
            expect(res.text).to.contain('firstName');
            expect(res.text).to.contain('middleName');
            expect(res.text).to.contain('lastName');
            expect(res.text).to.contain('Addresses');
            expect(res.text).to.contain('addressId');
            expect(res.text).to.contain('addressL1');
            expect(res.text).to.contain('addressL2');
            expect(res.text).to.contain('city');
            expect(res.text).to.contain('state');
            expect(res.text).to.contain('zipcode');
            expect(res.text).to.contain('country');
            expect(res.text).to.contain('primary');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Entry Detail application/json', () => {
      it('should get the entry with primary associations', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1/primary')
          .set('Accept', 'application/json')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body');
            expect(res.body).to.have.property('entryId');
            expect(res.body).to.have.property('createdAt');
            expect(res.body).to.have.property('updatedAt');
            expect(res.body).to.have.property('Names')
              .that.is.an('array');
            expect(res.body.Names).to.all.have.property('nameId');
            expect(res.body.Names).to.all.have.property('honorific');
            expect(res.body.Names).to.all.have.property('firstName');
            expect(res.body.Names).to.all.have.property('middleName');
            expect(res.body.Names).to.all.have.property('lastName');
            expect(res.body.Names).to.all.have.property('primary');
            expect(res.body).to.have.property('Addresses')
              .that.is.an('array');
            expect(res.body.Addresses).to.all.have.property('addressId');
            expect(res.body.Addresses).to.all.have.property('addressL1');
            expect(res.body.Addresses).to.all.have.property('addressL2');
            expect(res.body.Addresses).to.all.have.property('city');
            expect(res.body.Addresses).to.all.have.property('state');
            expect(res.body.Addresses).to.all.have.property('zipcode');
            expect(res.body.Addresses).to.all.have.property('country');
            expect(res.body.Addresses).to.all.have.property('primary');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/POST Api Entries/:id/detail', () => {
      it('should return 405 status and Allow Header', (done) => {
        chai.request(server)
          .post('/api/v1.0/contacts/1/primary')
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

    describe('/DELETE Delete Entry', () => {
      // get factories plugged into here first
      it('should delete an entry');
    });
  });
});
