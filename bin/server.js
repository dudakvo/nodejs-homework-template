const app = require("../app");
const db = require("../model/db");
require("dotenv").config();
const createFolderIsNotExist = require("../helpers/create-dir.js");

const PORT = process.env.PORT || 3000;

const UPLOAD_DIR = process.env.UPLOAD_DIR;
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;

db.then(() => {
  app.listen(PORT, async () => {
    try {
      await createFolderIsNotExist(UPLOAD_DIR);
      await createFolderIsNotExist(AVATAR_OF_USERS);
    } catch (error) {
      console.log(`!!!!!ERROR=${error.message}`);
    }
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((error) => {
  console.log(`Server not runnig. Error massege: ${error.massege}`);
});
