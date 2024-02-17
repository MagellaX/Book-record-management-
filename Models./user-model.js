const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  issuedBook: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: false },
  issuedDate: String,
  returnDate: String,
  subscriptionType: { type: String, required: true },
  subscriptionDate: { type: String, required: true }
}, 

{ timestamps: true });

module.exports = mongoose.model("User", userSchema);
