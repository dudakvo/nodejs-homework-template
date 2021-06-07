const express = require("express");
const ctrl = require("../../../controllers/contacts");
const router = express.Router();
const guard = require("../../../helpers/guards");

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateFavorite,
} = require("./validation.js");

router.get("/", guard, ctrl.getContacts);

router.get("/:id", guard, ctrl.getContactByID);

router.post("/", guard, validateCreateContact, ctrl.addContact);

router.delete("/:contactId", guard, ctrl.dellContact);

router.patch("/:contactId", guard, validateUpdateContact, ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  guard,
  validateUpdateFavorite,
  ctrl.updateStatusContact
);

module.exports = router;
