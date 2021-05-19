const express = require("express");
const Contacts = require("../../model/index");
const router = express.Router();
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateFavorite,
} = require("./validation.js");

router.get("/", async (req, res, next) => {
  try {
    return res.json({
      status: "success",
      code: 200,
      data: await Contacts.listContacts(),
    });
  } catch (error) {
    next(error.message);
  }
});

router.get("/:id", async (req, res, next) => {
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
});

router.post("/", validateCreateContact, async (req, res, next) => {
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
});

router.delete("/:contactId", async (req, res, next) => {
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
});

router.patch("/:contactId", validateUpdateContact, async (req, res, next) => {
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
});

router.patch(
  "/:contactId/favorite",
  validateUpdateFavorite,
  async (req, res, next) => {
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
  }
);

module.exports = router;
