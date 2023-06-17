import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
export default mongoose.model(
  "Student",
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
    phoneNumber: {
      type: String,
      required: true,
      validate: (phoneNumber) =>
        phoneNumber.length > 5 && phoneNumber.length < 20,
      message: "Phone number must be at least 5 character, max: 20",
    },
    address: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "{VALUE} is not supported",
      },
    },
  })
);
