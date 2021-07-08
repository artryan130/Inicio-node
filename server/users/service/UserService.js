const User = require('../model/User');

class UserService {
   async createUser(user){
       await User.create(user);
    }
}

module.exports = new UserService;