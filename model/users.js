const User = require("./schemas/user");

const findByID = async (id) => await User.findOne({ _id: id });

const findByEmail = async (email) => await User.findOne({ email });

const create = async (option) => {
  const user = new User(option);
  return await user.save();
};

const updateToken = async (id, token) =>
  await User.updateOne({ _id: id }, { token });

module.exports = { findByID, findByEmail, create, updateToken };
