const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxLength: [30, "First name cannot be more than 30 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: [30, "Last name cannot be more than 30 characters"],
    },
    emailId: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      maxLength: [50, "Email cannot be more than 50 characters"],
      unique: [true, "Email already exists"],
      validate: [
        function (value) {
          return validator.isEmail(value);
        },
        "Invalid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minLength: [6, "Password must be at least 6 characters"],
      maxLength: [50, "Password cannot be more than 50 characters"],
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [100, "Age cannot be more than 100"],
    },
    gender: {
      type: String,
      validate: [
        function (value) {
          return ["male", "female", "other"].includes(value.toLowerCase());
        },
        "Gender must be male, female or other",
      ],
    },
    photoUrl: {
      type: String,
      default: "",
      validate: [
        function (value) {
          return validator.isURL(value);
        },
        "Invalid Image URL",
      ],
    },
    about: {
      type: String,
      trim: true,
      maxLength: 300,
      default: "Hey there, I am using Wartalap",
    },
    skills: {
      type: [String],
      validate: [
        function (value) {
          return value.length <= 5;
        },
        "Skills cannot be more than 5",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
