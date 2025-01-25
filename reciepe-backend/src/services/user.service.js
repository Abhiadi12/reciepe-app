const jwt = require("jsonwebtoken");
const ResourceAlreadyExist = require("../error/resourceExist.error");
const NotFound = require("../error/notFound.error");
const checkValidId = require("../utils/checkValidId");
const { JWT_SECRET } = require("../config/index").serverConfig;

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  generateToken(userId, expireTime = "1h") {
    return jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: expireTime,
    });
  }

  async signup(payload) {
    try {
      const userExists = await this.userRepository.findUserByEmail(
        payload?.user
      );
      if (userExists) throw new ResourceAlreadyExist("User");

      const user = await this.userRepository.createUser(payload);

      return {
        _id: user._id,
        username: user.username,
        email: user.email,
      };
    } catch (error) {
      throw error;
    }
  }

  async signin(payload) {
    try {
      const { email, password } = payload;
      const user = await this.userRepository.findUserByEmail(email);

      if (!user || !(await user.matchPassword(password))) {
        throw new NotFound("User", "Invalid email or password");
      }

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: this.generateToken(user._id),
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserProfile(userId) {
    try {
      const isvalid = checkValidId(userId);
      if (!isvalid) {
        throw new BadRequest("Invalid User Id");
      }
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new NotFound("User");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
