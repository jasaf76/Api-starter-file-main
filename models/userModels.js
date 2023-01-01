const mongoose = require("mongoose");
const validator = require("validator");

//name,email,photo,password,passwordConfirmed
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
  },
  passwordConfirmed: {
    type: String,
    required: [true, "A user must have a passwordConfirmed"],
    validate: {
      //This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el == this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
