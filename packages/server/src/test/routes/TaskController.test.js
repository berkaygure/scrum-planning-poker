const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { URL_ROOMS } = require('@scrum-game/common');
const jwt = require('jsonwebtoken');

const app = require('../../index.js');
const User = require('../../models/User.js');
const config = require('../../config');
const Room = require('../../models/Room.js');

chai.should();

chai.use(chaiHttp);

describe('Tasks', function () {
  describe('Unauthenticated', function () {
    it('SHOULD NOT ACCESS ALL TASKS LIST WITHOUT LOGIN', function (done) {
      chai
        .request(app)
        .get(`${URL_ROOMS}/123/tasks`)
        .set('authorization', 'Bearer ' + 'MyToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.deep.nested.property('errors[0].unauthenticated');
          done();
        });
    });
    it('SHOULD NOT ACCESS CREATE TASK WITHOUT LOGIN', function (done) {
      chai
        .request(app)
        .post(`${URL_ROOMS}/123/tasks`)
        .set('authorization', 'Bearer ' + 'MyToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.deep.nested.property('errors[0].unauthenticated');
          done();
        });
    });

    it('SHOULD NOT ACCESS DELETE TASK WITHOUT LOGIN', function (done) {
      chai
        .request(app)
        .delete(`${URL_ROOMS}/123/tasks/222`)
        .set('authorization', 'Bearer ' + 'MyToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.deep.nested.property('errors[0].unauthenticated');
          done();
        });
    });
  });

  describe('Authenticated', function () {
    let token = '';
    let userId = 0;

    beforeEach((done) => {
      const user = new User({ username: 'berkay.guree', password: '123456' });
      user.save().then((user) => {
        userId = user._id;
        token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400,
        });
        done();
      });
    });

    it('SHOULD LIST ALL TASKS of THE ROOM', function (done) {
      const room = new Room({
        name: 'Demo Room',
        tasks: [
          {
            name: 'Demo Task',
          },
        ],
      });

      room.save().then((r) => {
        chai
          .request(app)
          .get(`${URL_ROOMS}/${r._id}/tasks`)
          .set('authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be
              .an('array')
              .that.have.lengthOf(1)
              .that.deep.have.nested.property('[0].name', 'Demo Task');
            done();
          });
      });
    });

    it('SHOULD CREATE A TASK FOR A ROOM', function (done) {
      const room = new Room({
        name: 'Demo Room',
        tasks: [],
        owner: mongoose.Types.ObjectId(userId),
      });

      room.save().then((r) => {
        chai
          .request(app)
          .post(`${URL_ROOMS}/${r._id}/tasks`)
          .set('authorization', 'Bearer ' + token)
          .send({ name: 'Demo Task' })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be
              .an('array')
              .that.have.lengthOf(1)
              .that.deep.have.nested.property('[0]._id');
            done();
          });
      });
    });

    it('SHOULD NOT CREATE A TASK WITH NAME LENGTH LESS THAN 3', function (done) {
      const room = new Room({
        name: 'Demo Room',
        tasks: [],
        owner: mongoose.Types.ObjectId(userId),
      });

      room.save().then((r) => {
        chai
          .request(app)
          .post(`${URL_ROOMS}/${r._id}/tasks`)
          .set('authorization', 'Bearer ' + token)
          .send({ name: 'TA' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.deep.nested.property('errors[0].name');
            done();
          });
      });
    });

    it('SHOULD NOT CREATE A TASK IF USERS HAS NOT OWNERSHIP THE ROOM', function (done) {
      const room = new Room({
        name: 'Demo Room',
        tasks: [],
      });

      room.save().then((r) => {
        chai
          .request(app)
          .post(`${URL_ROOMS}/${r._id}/tasks`)
          .set('authorization', 'Bearer ' + token)
          .send({ name: 'Demo Task' })
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.deep.nested.property('errors[0].unauthorized');
            done();
          });
      });
    });

    it('SHOULD NOT REMOVE TASK FROM THE ROOM IF USERS HAS NOT OWNERSHIP THE ROOM', function (done) {
      const room = new Room({
        name: 'Demo Room',
        tasks: [{ name: 'Demo' }],
      });

      room.save().then((r) => {
        chai
          .request(app)
          .delete(`${URL_ROOMS}/${r._id}/tasks/${r.tasks[0]._id}`)
          .set('authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.deep.nested.property('errors[0].unauthorized');

            done();
          });
      });
    });

    it('SHOULD REMOVE TASK FROM THE ROOM', function (done) {
      const room = new Room({
        name: 'Demo Room',
        tasks: [{ name: 'Demo' }],
        owner: mongoose.Types.ObjectId(userId),
      });

      room.save().then((r) => {
        chai
          .request(app)
          .delete(`${URL_ROOMS}/${r._id}/tasks/${r.tasks[0]._id}`)
          .set('authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.should.have.status(200);

            res.body.should.be.an('array').that.have.lengthOf(0);
            done();
          });
      });
    });

    it('SHOULD NOT UPDATE TASK FROM THE ROOM IF USERS HAS NOT OWNERSHIP THE ROOM', function (done) {
      const room = new Room({
        name: 'Demo Room',
        tasks: [{ name: 'Demo' }],
      });

      room.save().then((r) => {
        chai
          .request(app)
          .put(`${URL_ROOMS}/${r._id}/tasks/${r.tasks[0]._id}`)
          .send({ name: 'Edited Task' })
          .set('authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.deep.nested.property('errors[0].unauthorized');

            done();
          });
      });
    });

    it('SHOULD UPDATE TASK OF A ROOM', function (done) {
      const room = new Room({
        name: 'Demo Room',
        tasks: [{ name: 'Demo' }],
        owner: mongoose.Types.ObjectId(userId),
      });

      room.save().then((r) => {
        chai
          .request(app)
          .put(`${URL_ROOMS}/${r._id}/tasks/${r.tasks[0]._id}`)
          .send({ name: 'Edited Task' })
          .set('authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.body.should.be
              .an('array')
              .that.have.lengthOf(1)
              .that.deep.have.nested.property('[0].name', 'Edited Task');
            done();
          });
      });
    });
  });
});
