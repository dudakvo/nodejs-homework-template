const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema({
  name: { type: String, required: [true, "Set name for contact"] },
  email: { type: String, required: [true, "Set e-mail for contact"] },
  phone: { type: String, required: [true, "Set phone number for contact"] },
  favorite: { type: Boolean, default: false },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
});

contactSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema);

module.exports = Contact;
