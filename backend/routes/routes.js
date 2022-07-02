//Contact Routes
const express = require("express");
const expree = require("express-session");
const router = express.Router();
const contactController = require("../controller/ContactController");
const userController = require("../controller/userController");
const authService = require("../service/authService");

router.get("/:id", authService.authMiddleware, contactController.getContact);
router.get("/", authService.authMiddleware, contactController.getContacts);
router.post("/", authService.authMiddleware, contactController.addContact);
router.put("/", authService.authMiddleware, contactController.updateContact);
router.delete("/logout", userController.logout);
router.delete(
  "/:id",
  authService.authMiddleware,
  contactController.deleteContact
);
router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.post("/authenticate", userController.authenticate);
router.post("/role", userController.verifyRoles);

module.exports = router;
