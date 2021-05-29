const express = require("express");
const ctrl = require("../../../controllers/users");
const router = express.Router();
const guard = require("../../../helper/guards");

router.post("/register", ctrl.reg);
router.post("/login", ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.get("/current", guard, ctrl.current);

module.exports = router;
