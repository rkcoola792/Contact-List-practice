// requiring the mongose
const mongoose = require("mongoose");

// creating the schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

// creating the model(table), the first letter should be capital ("ModelName",schema defined for it)
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
