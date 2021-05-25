const { HttpCode } = require("./constants");
const passport = require("passport");
require("../config/passport");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    let token = null;
    if (req.get("Authrization")) {
      token = req.get("Authrization").split(" ")[1];
    }
    if (!user || error || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Access denied",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
  next();
};

module.exports = guard;
