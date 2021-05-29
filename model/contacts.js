const Contact = require("./schemas/contact");

const listContacts = async (userID) => {
  try {
    console.log(`list contacts user ID = ${userID}`);
    return await Contact.find({ owner: userID });
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (userID, id) => {
  try {
    return await Contact.findOne({ _id: id, owner: userID });
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (userID, id) => {
  try {
    return await Contact.findByIdAndRemove({ _id: id, owner: userID });
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (userID, body) => {
  try {
    return await Contact.create({ ...body, owner: userID });
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (userID, id, body) => {
  try {
    return await Contact.findOneAndUpdate(
      { _id: id, owner: userID },
      { ...body },
      { new: true }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatusContact = async (userID, id, body) => {
  try {
    const result = await Contact.findOneAndUpdate(
      { _id: id, owner: userID },
      { ...body },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
