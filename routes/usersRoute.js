const express = require("express");
const userControllers = require("./../controllers/userControllers");

const router = express.Router();

//ROUTER UsenftsRouter
router.route("/").get(userControllers.getAllUsers).post(userControllers.createUsers);
router.route("/:id").get(userControllers.getSingleUser).patch(userControllers.updateUser).delete(userControllers.deleteUser);

module.exports = router;
