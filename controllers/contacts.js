const Contacts = require("../model/contacts");

const getContacts = async (req, res, next) => {
  try {
    console.log(` get all contact ${req.user}`);
    const contactsArray = await Contacts.listContacts();
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
    const contact = await Contacts.getContactById(req.params.id);
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
    const contactAdded = await Contacts.addContact(req.body);
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
    const contact = await Contacts.removeContact(req.params.contactId);
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
    const contactUpdated = await Contacts.updateContact(
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
    if (req.body.favorite) {
      const result = await Contacts.updateStatusContact(
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
