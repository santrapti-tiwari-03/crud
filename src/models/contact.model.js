import mongoose from "mongoose";
import validator from "validator";

const contactSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile_number: {
      type: Number,
      required: true,
      unique: true,
  },
},
  {
    timestamps: true,
  }
);

export default mongoose.model("Contact", contactSchema);
