require("dotenv").config();
const mongoose = require("mongoose");

const db = mongoose.connect(process.env.URI_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  poolSize: 5,
});

mongoose.connection.on("connected", () => {
  console.log("Connection MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`MongoDB disconnected`);
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Disconnect MongoDB");
    process.exit();
  });
});

module.exports = db;
