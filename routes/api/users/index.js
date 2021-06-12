const express = require("express");
const ctrl = require("../../../controllers/users");
const upload = require("../../../helpers/upload");
const router = express.Router();
const guard = require("../../../helpers/guards");
const {
  validateCreateUser,
  validateUpdateUser,
  validateResendUserValidationEmail,
} = require("./validation.js");

router.post("/register", validateCreateUser, ctrl.reg);
router.post("/login", ctrl.login);
router.post("/logout", guard, ctrl.logout);

router.get("/current", guard, ctrl.current);
router.patch("/avatars", [guard, upload.single("avatar")], ctrl.avatar);
router.patch("/:id", guard, validateUpdateUser, ctrl.userUpdate);

router.post(
  "/verify",
  validateResendUserValidationEmail,
  ctrl.resendEmailVerify
);
router.get("/verify/:token", ctrl.verifyUser);

module.exports = router;
