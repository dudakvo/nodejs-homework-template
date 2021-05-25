const { HttpCode } = require("./constants");
const passport = require("passport");
require("../config/passport");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    let token = null;

    if (req.get("Authorization")) {
      token = req.get("Authorization").split(" ")[1];
    }

    if (!user || error || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Access denied",
      });
    }
    req.user = user;
    console.log(
      "🚀 ~ file: guards.js ~ line 21 ~ passport.authenticate ~ req.user",
      req.user
    );
    return next();
  })(req, res, next);
  next();
};

module.exports = guard;
