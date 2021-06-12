const Mailgen = require("mailgen");

require("dotenv").config();

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;

      case "prodaction":
        this.link = "link for prodaction";
        break;

      default:
        this.link = "http://localhost:3000";
        break;
    }
  }

  createTemplateVerifyEmail(token, name) {
    const mailGenerator = new Mailgen({
      theme: "neopolitan",
      product: {
        name: "Contacts book",
        link: this.link,
      },
    });

    const email = {
      body: {
        name: "John Appleseed",
        intro: "Welcome to Mailgen! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Mailgen, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${token}`,
          },
        },
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyPasswordEmail(token, email) {
    const emailBody = this.createTemplateVerifyEmail(token, email);
    const result = await this.sender.send({
      to: email,
      subject: "Verify your email",
      html: emailBody,
    });
    console.log(result);
  }
}

module.exports = EmailService;
