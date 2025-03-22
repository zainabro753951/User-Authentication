import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
    verificationTokenExpiryDate: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "/uploads/default-avator.png",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const users = mongoose.model("users", userSchema);

export { users };
