const User = require("../models/User");
const EntityAlreadyExists = require("../exceptions/EntityAlreadyExists");

class AuthService {
    constructor() {
        this.register = this.register.bind(this);
        this.findById = this.findById.bind(this);
        this.findByName = this.findByName.bind(this);
    }
    async register(name, password) {
        const isExists = await this.findByName(name);
        if(isExists) {
            throw new EntityAlreadyExists();
        }
        const user = new User({ name, password });
        return user.save();
    }    
    
    async login(name ,pwd) {
        const user = await this.findByName(name);
        if(user) {
            const isMatched = await user.comparePassword(pwd);
            console.log(isMatched);
            if(isMatched) {
                return user;
            }
            return false;
        }

        return false;
    }

    async findById(id) {
        return await User.findById(id).exec();
    }

    async findByName(name) {
        return await User.findOne({name}).exec();
    }
}

module.exports = AuthService;