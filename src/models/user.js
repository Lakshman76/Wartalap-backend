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
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      maxLength: [100, "Email cannot be more than 100 characters"],
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
      validate: [
        function (value) {
          return validator.isStrongPassword(value);
        },
        "Please enter a strong password",
      ],
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
          return value.length <= 10;
        },
        "Skills cannot be more than 10",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
