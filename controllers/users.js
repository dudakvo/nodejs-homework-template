const jwt = require("jsonwebtoken");
require("dotenv").config();
const UploadAvatar = require("../services/upload-avatars-local");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;

const Users = require("../model/users");
const { HttpCode } = require("../helpers/constants");

const reg = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email is alrady used",
      });
    }

    const { id, email, subscription, avatarURL } = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { id, email, subscription, avatarURL },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Access denied",
      });
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(user.id, token);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const userID = req.user.id;
  try {
    await Users.updateToken(userID, null);
    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  const userID = req.user.id;
  const { email, subscription } = await Users.findByID(userID);
  try {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const userUpdate = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(HttpCode.BAD_REQUEST).json({
      stsus: "Access denied",
      code: HttpCode.BAD_REQUEST,
      data: { message: "access denied" },
    });
  }
  try {
    const { _id, email, subscription } = await Users.subscriptionUpdate(
      req.params.id,
      req.body.subscription
    );
    return res.status(HttpCode.OK).json({
      stsus: "success",
      code: HttpCode.OK,
      data: { _id, email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const avatar = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatar(AVATAR_OF_USERS);
    const avatarURL = await uploads.saveToStatic({
      idUser: id,
      pathFile: req.file.path,
      oldFile: req.user.avatarURL,
      name: req.file.filename,
    });
    await Users.updateAvatar(id, avatarURL);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { avatarURL },
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = { reg, login, logout, current, userUpdate, avatar };
