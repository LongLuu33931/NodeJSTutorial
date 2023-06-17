import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
const User = mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true, //not null,
      validate: {
        validator: (value) => value.length > 3,
        message: "Username must be at least 3 characters",
      },
    },
    email: {
      type: String,
      validate: {
        validator: (value) => isEmail,
        message: "Email is incorrect format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: (phoneNumber) => phoneNumber.length > 5,
      message: "Phone number must be at least 5 character",
    },
    address: {
      type: String,
      required: true,
      validate: (address) => address.length > 5,
      message: "Address must be at least 5 character",
    },
  })
);
export default User;
