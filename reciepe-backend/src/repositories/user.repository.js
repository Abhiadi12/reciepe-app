const { User } = require("../models");

class UserRepository {
  async createUser(payload) {
    try {
      return await User.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id) {
    return await User.findById(id).select("-password");
  }
}

module.exports = UserRepository;
