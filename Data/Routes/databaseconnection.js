const mongoose = require("mongoose");

function DbConnection() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("error", console.error.bind(console, "Connection error"));

  mongoose.connection.once("open", () =>
   {
    console.log("DB Connected");
  });
}

module.exports = DbConnection;
