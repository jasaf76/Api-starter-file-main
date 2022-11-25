const express = require("express");

///---USERS
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
const createUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
const getSingleUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};

const router = express.Router();

//ROUTER UsenftsRouter
router.route("/").get(getAllUsers).post(createUsers);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
