const Contacts = require("../model/contacts");

const getContacts = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const contactsArray = await Contacts.listContacts(userID, req.query);
    return res.json({
      status: "success",
      code: 200,
      data: contactsArray,
    });
  } catch (error) {
    next(error.message);
  }
};

const getContactByID = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const contact = await Contacts.getContactById(userID, req.params.id);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: contact,
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      massage: "not found",
    });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userID = req.user.id;
    console.log(
      "🚀 ~ file: contacts.js ~ line 41 ~ addContact ~ userID",
      userID
    );
    const contactAdded = await Contacts.addContact(userID, req.body);
    if (contactAdded) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: contactAdded,
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      massage: "not found",
    });
  } catch (error) {
    next(error.message);
  }
};

const dellContact = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const contact = await Contacts.removeContact(userID, req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: contact,
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      massage: "not found",
    });
  } catch (error) {
    next(error.message);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const contactUpdated = await Contacts.updateContact(
      userID,
      req.params.contactId,
      req.body
    );

    if (contactUpdated) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: contactUpdated,
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      massage: "not found",
    });
  } catch (error) {
    next(error.message);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const userID = req.user.id;
    if (req.body.favorite) {
      const result = await Contacts.updateStatusContact(
        userID,
        req.params.contactId,
        req.body
      );
      res.status(200).json({
        status: "success",
        code: 200,
        data: result,
      });
      return result;
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      massage: "missing field favorite",
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  getContacts,
  getContactByID,
  dellContact,
  updateContact,
  updateStatusContact,
  addContact,
};
