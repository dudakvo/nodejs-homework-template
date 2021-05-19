const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: { type: String, required: [true, "Set name for contact"] },
  email: { type: String, required: [true, "Set e-mail for contact"] },
  phone: { type: String, required: [true, "Set phone number for contact"] },
  favorite: { type: Boolean, default: false },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;

// module.imports = { Contact };
