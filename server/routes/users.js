const express = require("express");
const { createUser, listUsers } = require("../controllers/userController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, createUser);
router.get("/", authMiddleware, adminMiddleware, listUsers);

module.exports = router;


