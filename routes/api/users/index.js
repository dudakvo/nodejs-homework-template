const express = require("express");
const ctrl = require("../../../controllers/users");
const router = express.Router();
const guard = require("../../../helper/guards");
const { validateCreateUser, validateUpdateUser } = require("./validation.js");

router.post("/register", validateCreateUser, ctrl.reg);
router.post("/login", ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.get("/current", guard, ctrl.current);
router.patch("/:id", guard, validateUpdateUser, ctrl.userUpdate);

module.exports = router;
