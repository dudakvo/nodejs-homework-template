const express = require("express");
const ctrl = require("../../../controllers/users");
const router = express.Router();

router.post("/register", ctrl.reg);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);

module.exports = router;
