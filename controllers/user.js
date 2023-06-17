import { body, validationResult } from "express-validator";
import { studentRepository, userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HttpStatusCode from "../exceptions/httpStatusCode.js";
const myEvent = new EventEmitter();
myEvent.on("event.register.user", (param) => {
  console.log(`they talked about: ${JSON.stringify(param)}`);
});
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let existingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login user successfully",
      data: existingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;
  //destructuring

  //Event Emitter
  myEvent.emit("event.register.user", { email, phoneNumber });
  try {
    const user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "register user successfully",
      data: user,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getDetailUser = async (req, res) => {};

export default {
  login,
  register,
  getDetailUser,
};
