const app = require("../app");
const db = require("../models/index.js");

const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server not runnig. Error massege: ${error.massege}`);
  });
