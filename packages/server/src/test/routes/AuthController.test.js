const chai = require('chai');
const chaiHttp = require('chai-http');
const { URL_REGISTER, URL_LOGIN } = require('@scrum-game/common');
const app = require('../../index.js');
const User = require('../../models/User.js');

chai.should();

chai.use(chaiHttp);

describe('Authentication Test', () => {
  describe('/login', () => {
    it('SHOULD NOT LOGIN WITH WRONG CREDENTIALS', (done) => {
      const users = { username: 'berkay.gurex', password: '123456' };
      chai
        .request(app)
        .post(URL_LOGIN)
        .send(users)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.deep.nested.property('errors[0].credentials');
          done();
        });
    });
    it('SHOULD LOGIN AND GET TOKEN', (done) => {
      const user = new User({ username: 'berkay.gure1', password: '123456' });
      user.save().then(() => {
        const users = { username: 'berkay.gure1', password: '123456' };
        chai
          .request(app)
          .post(URL_LOGIN)
          .send(users)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('id');
            res.body.should.have.property('username', 'berkay.gure1');
            res.body.should.have.property('token');
            done();
          });
      });
    });
    it('SHOULD GIVE ERROR WHEN USERNAME IS EMPTY OR UNDEFINED', (done) => {
      const users = {
        password: '123456',
      };
      chai
        .request(app)
        .post(URL_LOGIN)
        .send(users)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.deep.nested.property('errors[0].username');
          done();
        });
    });
    it('SHOULD GIVE ERROR WHEN PASSWORD IS EMPTY OR UNDEFINED', (done) => {
      const users = {
        username: 'b.gure',
        password: '',
      };
      chai
        .request(app)
        .post(URL_LOGIN)
        .send(users)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.deep.nested.property('errors[0].password');
          done();
        });
    });
    it('SHOULD GIVE ERROR WHEN PASSWORD IS LESS THAN 6 CHARACTERS', (done) => {
      const users = {
        username: 'b.gure',
        password: '12345',
      };
      chai
        .request(app)
        .post(URL_LOGIN)
        .send(users)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.deep.nested.property('errors[0].password');
          done();
        });
    });
  });

  describe('/register', () => {
    it('SHOULD REGISTER WITH VALID USERNAME AND PASSWORD', (done) => {
      const users = {
        username: 'berkay.gure',
        password: '123456',
      };
      chai
        .request(app)
        .post(URL_REGISTER)
        .send(users)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('_id');
          done();
        });
    });
    it('SHOULD NOT REGISTER WITH SAME USERNAME', (done) => {
      const users = {
        username: 'berkay.gure',
        password: '123456',
      };
      chai
        .request(app)
        .post(URL_REGISTER)
        .send(users)
        .end((err, res) => {
          res.should.have.status(201);
          chai
            .request(app)
            .post(URL_REGISTER)
            .send(users)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('errors');
              done();
            });
        });
    });
    it('SHOULD NOT REGISTER WITHOUT USERNAME', (done) => {
      const users = {
        username: '',
        password: '123456',
      };
      chai
        .request(app)
        .post(URL_REGISTER)
        .send(users)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.deep.nested.property('errors[0].username');
          done();
        });
    });
    it('SHOULD NOT REGISTER WITH USERNAME LESS THAN 3 CHARACTER', (done) => {
      const users = {
        username: 'bg',
        password: '123456',
      };
      chai
        .request(app)
        .post(URL_REGISTER)
        .send(users)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.deep.nested.property('errors[0].username');
          done();
        });
    });
    it('SHOULD NOT REGISTER WITHOUT PASSWORD', (done) => {
      const users = {
        username: 'berkay.gure',
        password: '',
      };
      chai
        .request(app)
        .post(URL_REGISTER)
        .send(users)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.deep.nested.property('errors[0].password');
          done();
        });
    });
    it('SHOULD NOT REGISTER WITH PASSWORD LESS THAN 6 CHARACTERS', (done) => {
      const users = {
        username: 'bg1',
        password: '12345',
      };
      chai
        .request(app)
        .post(URL_REGISTER)
        .send(users)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.deep.nested.property('errors[0].password');
          done();
        });
    });
  });
});
