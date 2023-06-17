import { ObjectId, Schema } from "mongoose";
import mongoose from "mongoose";
const Klass = mongoose.model(
  "Klass",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: () => this.name.length > 3,
        message: "class's name must be at least 4 characters",
      },
    },
  })
);
export default Klass;
