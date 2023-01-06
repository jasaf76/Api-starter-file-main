const User = require("./../models/userModels");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


///--USERS
exports.getAllUsers =catchAsync(async(req, res) => {
  const users = await User.find();
  
  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
exports.createUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
exports.getSingleUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  })
}