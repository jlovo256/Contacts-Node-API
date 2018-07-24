'use strict';

/* eslint-disable no-undef */

module.exports = ((server, chai, expect) => {

  describe('Hello Server', () => {
    describe('/GET Entry Point', () => {
      it('should return a host and port', (done) => {
        chai.request(server)
          .get('/')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.text).to.contain('Contacts API is listening on');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/GET Api Entry Point', () => {
      it('should return a host and port', (done) => {
        chai.request(server)
          .get('/api/v1.0')
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.text).to.contain('Contacts API is listening on');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/POST Entry Point', () => {
      it('should return 405 status and Allow Header', (done) => {
        chai.request(server)
          .post('/')
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

    describe('/POST Api Entry Point', () => {
      it('should return 405 status and Allow Header', (done) => {
        chai.request(server)
          .post('/api/v1.0')
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
