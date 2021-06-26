const mongoose = require('mongoose');

exports.mochaHooks = {
  afterEach(done) {
    mongoose.connection.db.dropDatabase().then(() => {
      done();
    });
  },
};
