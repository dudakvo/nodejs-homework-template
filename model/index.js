const Contact = require("./schemas/contact");

const listContacts = async () => {
  try {
    return await Contact.find({});
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (id) => {
  try {
    return await Contact.findOne({ _id: id });
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (id) => {
  try {
    return await Contact.findByIdAndRemove({ _id: id });
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (id, body) => {
  try {
    return await Contact.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
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
};
