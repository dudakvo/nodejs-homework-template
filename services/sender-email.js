const sgMail = require("@sendgrid/mail");

require("dotenv").config();

class CreateSenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    return await sgMail.send({ ...msg, from: "dudakvo@gmail.com" });
  }
}

module.exports = { CreateSenderSendgrid };
