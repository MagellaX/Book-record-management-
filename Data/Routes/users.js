const express = require("express");

const router = express.Router();

const { UserModel, BookModel } = require("../models");
const userController = require("../controllers/user-controller");

// Define routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getSingleUserById);
router.post("/", userController.createNewUser);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUser);
router.get("/subscription-details/:id", userController.getSubscriptionDetailsById);

module.exports = router;
