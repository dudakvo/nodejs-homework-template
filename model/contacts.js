const Contact = require("./schemas/contact");

const listContacts = async (userID, query) => {
  const { limit = 5, page = 1, favorite = null } = query;
  const optionSearch = { owner: userID };
  if (favorite !== null) {
    optionSearch.favorite = favorite;
  }
  try {
    console.log(`list contacts user ID = ${userID}`);
    const { docs: contacts, totalDocs: total } = await Contact.paginate(
      optionSearch,
      { limit, page }
    );
    return { contacts, total, limit, page };
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
