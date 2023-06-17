import { print, OutputType } from "../helpers/print.js";
export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
  static WRONG_CONNECTION_STRING = "Wrong server name/connection string";
  static CANNOT_CONNECT_MONGODB = "Cannot connect to MongoDB";
  static USER_EXIST = "User already exist";
  static CANNOT_REGISTER_USER = "Cannot register user";
  static CANNOT_LOGIN = "Wrong email or password";
  constructor(message, validationErrors = {}) {
    super(message); //call constructor of parent class
    print(message, OutputType.ERROR);
    this.validationErrors = validationErrors;
  }
}
