const User = require("./schemas/user");

const findByID = async (id) => await User.findOne({ _id: id });

const findByEmail = async (email) => await User.findOne({ email });

const create = async (option) => {
  const user = new User(option);
  return await user.save();
};

const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token });
};

const subscriptionUpdate = async (id, subscription) => {
  try {
    return await User.findOneAndUpdate(
      { _id: id },
      { subscription },
      { new: true }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

module.exports = {
  findByID,
  findByEmail,
  create,
  updateToken,
  subscriptionUpdate,
  updateAvatar,
};
