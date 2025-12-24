// routes/users.routes.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/mstuserController");

// Create User
router.post("/", usersController.createUser);

// Get All Users
router.get("/", usersController.getUsers);

// Get User By ID
router.get("/:id", usersController.getUserById);

// Update User
router.put("/:id", usersController.updateUser);

// Delete User
router.delete("/:id", usersController.deleteUser);

module.exports = router;
