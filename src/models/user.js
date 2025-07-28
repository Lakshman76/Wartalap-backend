const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
        validate: function (value) {
            if (["male", "female", "other"].includes(value.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        }
    },
    about: {
        type: String,
        trim: true,
        maxLength: 300,
        default: "Hey there, I am using Wartalap"
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;