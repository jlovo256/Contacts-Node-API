'use strict';

/* eslint-disable no-undef */

module.exports = ((server, chai, expect) => {

  describe('Names Routes', () => {
    describe('/POST Create Name text/plain', () => {
      it('create a name', (done) => {
        chai.request(server)
          .post('/api/v1.0/contacts/1/names')
          .set('Accept', 'text/plain')
          .send({
            "honorific": "Mr.",
            "firstName": "Philip",
            "middleName": "J.",
            "lastName": "Fry"
          })
          .then((res) => {
            expect(res).to.have.status(201);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('nameId');
            expect(res.text).to.contain('primary');
            expect(res.text).to.contain('honorific');
            expect(res.text).to.contain('firstName');
            expect(res.text).to.contain('middleName');
            expect(res.text).to.contain('lastName');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/POST Create Name application/json', () => {
      it('create a name', (done) => {
        chai.request(server)
          .post('/api/v1.0/contacts/1/names')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({
            "honorific": "Mr.",
            "firstName": "Philip",
            "middleName": "J.",
            "lastName": "Fry"
          })
          .then((res) => {
            expect(res).to.have.status(201);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body');
            expect(res.body).to.have.keys(
              'nameId',
              'primary',
              'honorific',
              'firstName',
              'middleName',
              'lastName',
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

    describe('/GET Select All Names Per Entry text/plain', () => {
      it('gets all names associated with an the entry', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1/names')
          .set('Accept', 'text/plain')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('nameId');
            expect(res.text).to.contain('primary');
            expect(res.text).to.contain('honorific');
            expect(res.text).to.contain('firstName');
            expect(res.text).to.contain('middleName');
            expect(res.text).to.contain('lastName');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Select All Names Per Entry application/json', () => {
      it('gets all names associated with an the entry', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1/names')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body')
              .that.is.an('array');
            expect(res.body).to.all.have.property('nameId');
            expect(res.body).to.all.have.property('primary');
            expect(res.body).to.all.have.property('honorific');
            expect(res.body).to.all.have.property('firstName');
            expect(res.body).to.all.have.property('middleName');
            expect(res.body).to.all.have.property('lastName');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/PUT Names', () => {
      it('should return 405 status and Allow Header', (done) => {
        chai.request(server)
          .put('/api/v1.0/contacts/1/names')
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

    describe('/GET Select Name text/plain', () => {
      it('should get the name', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1/names/1')
          .set('Accept', 'text/plain')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('nameId');
            expect(res.text).to.contain('honorific');
            expect(res.text).to.contain('firstName');
            expect(res.text).to.contain('middleName');
            expect(res.text).to.contain('lastName');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Select Name application/json', () => {
      it('should get the name', (done) => {
        chai.request(server)
          .get('/api/v1.0/contacts/1/names/1')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body');
            expect(res.body).to.have.keys(
              'nameId',
              'primary',
              'honorific',
              'firstName',
              'middleName',
              'lastName',
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

    describe('/PUT Update Name text/plain', () => {
      it('should update the name', (done) => {
        chai.request(server)
          .put('/api/v1.0/contacts/1/names/1')
          .set('Accept', 'text/plain')
          .send({
            "honorific": "Mr.",
            "firstName": "Philip",
            "middleName": "J.",
            "lastName": "Fry",
            "primary": true
          })
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('text/plain; charset=utf-8');
            expect(res).to.have.property('text');
            expect(res.text).to.contain('nameId');
            expect(res.text).to.contain('honorific');
            expect(res.text).to.contain('firstName');
            expect(res.text).to.contain('middleName');
            expect(res.text).to.contain('lastName');
            expect(res.text).to.contain('createdAt');
            expect(res.text).to.contain('updatedAt');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/PUT Update Name application/json', () => {
      it('should update the name', (done) => {
        chai.request(server)
          .put('/api/v1.0/contacts/2/names/2')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({
            "honorific": "Captain",
            "firstName": "Turanga",
            "middleName": "K.",
            "lastName": "Leela",
            "primary": true
          })
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('header');
            expect(res.header).to.have.property('content-type')
              .eql('application/json; charset=utf-8');
            expect(res).to.have.property('body');
            expect(res.body).to.have.keys(
              'nameId',
              'primary',
              'honorific',
              'firstName',
              'middleName',
              'lastName',
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

    describe('/DELETE Delete Name', () => {
      it('should delete the name');
    });

    describe('/POST Names', () => {
      it('should return 405 status and Allow Header', (done) => {
        chai.request(server)
          .post('/api/v1.0/contacts/1/names/1')
          .then((res) => {
            expect(res).to.have.status(405);
            expect(res).to.have.property('header');
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
