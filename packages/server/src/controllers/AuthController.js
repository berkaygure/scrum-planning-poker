const jwt = require('jsonwebtoken');
const AuthService = require('../service/AuthService');
const config = require('../config');

class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.me = this.me.bind(this);
  }

  async me(req, res) {
    const user = await this.authService.findById(req.params.id);
    res.json(user);
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await this.authService.login(username, password);
    if (!user) {
      res.status(400).json({
        errors: [{ credentials: 'Your credentials are wrong!' }],
      });
    } else {
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      res.json({
        username: user._doc.username,
        id: user._doc._id,
        token,
      });
    }
  }

  async register(req, res) {
    const { username, password } = req.body;
    try {
      const user = await this.authService.register(username, password);
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      })
      
      res.status(201).json({
        _id: user._id,
        username: user.username,
        token
      });
    } catch (e) {
      res.status(400).json({
        errors: [{ username: e.message }],
      });
    }
  }
}

module.exports = new AuthController();
