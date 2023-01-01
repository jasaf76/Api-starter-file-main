const express = require("express");
const userControllers = require("./../controllers/userControllers");
const authController = require("./../controllers/authController");
const router = express.Router();
//ROUTER AUTH
 router.post("/signup", authController.signup);


//ROUTER USERS
router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUsers);
router
  .route("/:id")
  .get(userControllers.getSingleUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
