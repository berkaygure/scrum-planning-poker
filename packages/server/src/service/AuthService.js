const User = require('../models/User');

class AuthService {
  constructor() {
    this.register = this.register.bind(this);
    this.findById = this.findById.bind(this);
    this.findByName = this.findByName.bind(this);
  }

  async register(username, password) {
    const isExists = await this.findByName(username);
    if (isExists) {
      throw new Error('Entity Already Exists');
    }
    const user = new User({ username, password });
    return user.save();
  }

  async login(username, pwd) {
    const user = await this.findByName(username);
    if (user) {
      const isMatched = await user.comparePassword(pwd);
      if (isMatched) {
        return user;
      }
      return false;
    }

    return false;
  }

  async findById(id) {
    return await User.findById(id).exec();
  }

  async findByName(username) {
    return await User.findOne({ username }).exec();
  }
}

module.exports = AuthService;
