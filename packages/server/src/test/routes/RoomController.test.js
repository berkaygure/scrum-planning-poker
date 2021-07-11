const chai = require('chai');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const chaiHttp = require('chai-http');
const { URL_ROOMS } = require('@scrum-game/common');
const config = require('../../config');
const app = require('../../index.js');
const User = require('../../models/User.js');
const Room = require('../../models/Room.js');

chai.should();

chai.use(chaiHttp);

describe('Rooms', () => {
  describe('Unauthenticated', () => {
    it('SHOULD NOT ACCESS ALL ROOM LIST WITHOUT LOGIN', (done) => {
      chai
        .request(app)
        .get(URL_ROOMS)
        .set('authorization', 'Bearer ' + 'MyToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.deep.nested.property('errors[0].unauthenticated');
          done();
        });
    });
    it('SHOULD NOT ACCESS A ROOM DETAILS WITHOUT LOGIN', (done) => {
      chai
        .request(app)
        .get(`${URL_ROOMS}/1`)
        .set('authorization', 'Bearer ' + 'MyToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.deep.nested.property('errors[0].unauthenticated');
          done();
        });
    });
    it('SHOULD NOT DELETE A ROOM WITHOUT LOGIN', (done) => {
      chai
        .request(app)
        .delete(`${URL_ROOMS}/1`)
        .set('authorization', 'Bearer ' + 'MyToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.deep.nested.property('errors[0].unauthenticated');
          done();
        });
    });
    it('SHOULD NOT CREATE A ROOM WITHOUT LOGIN', (done) => {
      chai
        .request(app)
        .post(`${URL_ROOMS}`)
        .set('authorization', 'Bearer ' + 'MyToken')
        .send({ name: 'demo ' })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.deep.nested.property('errors[0].unauthenticated');
          done();
        });
    });
    it('SHOULD NOT JOIN A ROOM WITHOUT LOGIN', (done) => {
      chai
        .request(app)
        .post(`${URL_ROOMS}/1/join`)
        .set('authorization', 'Bearer ' + 'MyToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.deep.nested.property('errors[0].unauthenticated');
          done();
        });
    });
    it('SHOULD NOT LEAVE A ROOM WITHOUT LOGIN', (done) => {
      chai
        .request(app)
        .delete(`${URL_ROOMS}/1/leave`)
        .set('authorization', 'Bearer ' + 'MyToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.deep.nested.property('errors[0].unauthenticated');
          done();
        });
    });
  });

  describe('Authenticated', () => {
    let token = '';
    let userId = 0;
    beforeEach((done) => {
      const user = new User({ username: 'berkay.gure1', password: '123456' });
      user.save().then((user) => {
        userId = user._id;
        token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400,
        });
        done();
      });
    });

    it('SHOULD LIST ALL ROOMS', (done) => {
      const room = new Room({ name: 'Demo Room' });

      room.save().then(() => {
        chai
          .request(app)
          .get(URL_ROOMS)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be
              .an('array')
              .that.have.lengthOf(1)
              .that.deep.have.nested.property('[0].name', 'Demo Room');
            done();
          });
      });
    });

    it('SHOULD RETURN A ROOM', (done) => {
      const room = new Room({ name: 'My Room' });

      room.save().then((r) => {
        chai
          .request(app)
          .get(`${URL_ROOMS}/${r._id}`)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('_id');
            res.body.should.have.property('name', 'My Room');
            done();
          });
      });
    });

    it('SHOULD CREATE A ROOM', (done) => {
      const room = { name: 'New room' };

      chai
        .request(app)
        .post(URL_ROOMS)
        .send(room)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('_id');
          res.body.should.have.property('name', room.name);
          Room.countDocuments({}, (err, c) => {
            c.should.be.equal(1);
            done();
          });
        });
    });

    it('SHOULD NOT CREATE A ROOM WITH NAME LENGTH LESS THAN 3', (done) => {
      const room = { name: 'Ne' };

      chai
        .request(app)
        .post(URL_ROOMS)
        .send(room)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.deep.nested.property('errors[0].name');
          Room.countDocuments({}, (err, c) => {
            c.should.be.equal(0);
            done();
          });
        });
    });

    it('SHOULD NOT REMOVE A ROOM IF THERE IS NO OWNERSHIP', (done) => {
      const room = new Room({ name: 'My Room' });

      room.save().then((r) => {
        chai
          .request(app)
          .delete(`${URL_ROOMS}/${r._id}`)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.deep.nested.property('errors[0].resource_not_found');

            Room.countDocuments({}, (err, c) => {
              c.should.be.equal(1);
              done();
            });
          });
      });
    });

    it('SHOULD REMOVE A ROOM', (done) => {
      const room = new Room({ name: 'My Room', owner: mongoose.Types.ObjectId(userId) });

      room.save().then((r) => {
        chai
          .request(app)
          .delete(`${URL_ROOMS}/${r._id}`)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(204);

            Room.countDocuments({}, (err, c) => {
              c.should.be.equal(0);
              done();
            });
          });
      });
    });

    it('SHOULD JOIN TO THE ROOM', (done) => {
      const roomToJoined = new Room({ name: 'My Room', owner: mongoose.Types.ObjectId(userId) });
      const userToJoin = new User({ username: 'berkay.gure1', password: '123456' });

      let userToJoinToken = '';
      userToJoin.save().then((user) => {
        userToJoinToken = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400,
        });
        roomToJoined.save().then((r) => {
          chai
            .request(app)
            .post(`${URL_ROOMS}/${r._id}/join`)
            .set('authorization', `Bearer ${userToJoinToken}`)
            .end((err, res) => {
              res.should.have.status(201);
              Room.findById(r._id).then((foundedRoom) => {
                foundedRoom.users.should.be
                  .an('array')
                  .that.have.lengthOf(1)
                  .that.include(user._id);
                done();
              });
            });
        });
      });
    });

    it('SHOULD  NOT JOIN TO THE ROOM THAT NOT EXISTS', (done) => {
      chai
        .request(app)
        .post(`${URL_ROOMS}/${1000}/join`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.deep.nested.property('errors[0].resource_not_found');
          done();
        });
    });

    it('SHOULD LEAVE FROM THE CHANNEL', (done) => {
      const joinedRoom = new Room({
        name: 'My Room',
        owner: mongoose.Types.ObjectId(userId),
        users: [mongoose.Types.ObjectId(userId)],
      });

      joinedRoom.save().then((r) => {
        chai
          .request(app)
          .delete(`${URL_ROOMS}/${r._id}/leave`)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('_id', r._id.toString());
            res.body.should.have.property('name', 'My Room');
            done();
          });
      });
    });

    it('SHOULD  NOT LEAVE FROM THE ROOM THAT NOT EXISTS', (done) => {
      chai
        .request(app)
        .delete(`${URL_ROOMS}/${1000}/leave`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.deep.nested.property('errors[0].resource_not_found');
          done();
        });
    });
  });
});
