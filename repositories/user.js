import Exception from "../exceptions/exceptions.js";
import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async ({ email, password }) => {
  // print("login user in user repository", OutputType.INFORMATION);
  let existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    //not encrypt password !
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      //create JWT
      let token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30 days",
          // expiresIn: "60",
        }
      );
      return {
        ...existingUser.toObject(),
        password: "not show",
        token: token,
      };
    } else {
      throw new Exception(Exception.CANNOT_LOGIN);
    }
  } else {
    throw new Exception(Exception.CANNOT_LOGIN);
  }
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Exception(Exception.USER_EXIST);
    }
    //encrypt password, use bcrypt
    //use for login
    // const isMatched = await bcrypt.compare(password, existingUser.password);
    // if(isMatched) {

    // }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    return { ...newUser._doc, password: "not show" };
  } catch (exception) {
    //check model validation here
    throw new Exception(Exception.CANNOT_REGISTER_USER);
  }
  // print(
  //   `register user with name: ${name} email: ${email} password: ${password} phone:${phoneNumber} address:${address}`,
  //   OutputType.INFORMATION
  // );
};

export default {
  login,
  register,
};
