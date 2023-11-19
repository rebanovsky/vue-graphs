const express = require("express");
const users = require("./../controllers/users");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.patch("/updateMe", authController.protect, users.updateMe);
router.delete("/deleteMe", authController.protect, users.deleteMe);

router.route("/").get(users.getAllUsers).post(users.createUser);

router
  .route("/:id")
  .get(users.getUser)
  .patch(users.updateUser)
  .delete(users.deleteUser);

module.exports = router;
