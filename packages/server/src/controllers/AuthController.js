const jwt = require("jsonwebtoken");
const AuthService = require("../service/AuthService");
const EntityAlreadyExists = require("../exceptions/EntityAlreadyExists");
const config = require("../config");

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
    if (
      req.body.name &&
      req.body.name.length > 0 &&
      req.body.pwd &&
      req.body.pwd.length > 0
    ) {
      const user = await this.authService.login(req.body.name, req.body.pwd);
      if (!user) {
        res.status(400).json({
          message: "Your credentials are wrong!",
        });
      }else{

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400
        });

        res.json({
          name: user._doc.name,
          id: user._doc._id,
          token
        });
      }
    } else {
      res.status(400).json({
        message: "Username and password is required",
      });
    }
  }

  async register(req, res) {
    try {
      if (
        req.body.name &&
        req.body.name.length > 0 &&
        req.body.pwd &&
        req.body.pwd.length > 0
      ) {
        const user = await this.authService.register(
          req.body.name,
          req.body.pwd
        );
        res.json(user);
      } else {
        res.status(400).json({
          message: "Username and password is required",
        });
      }
    } catch (e) {
      console.log(e);
      if (e instanceof EntityAlreadyExists) {
        res.status(400).json({
          message: "Your username already taken",
        });
      }
    }
  }
}

module.exports = new AuthController();
