const mongoose = require("mongoose");

// this is how our mongoose will cconect to the dataabass(connected to the database)
mongoose.connect("mongodb://localhost/contacts_lists_db");

// acquiring the connection, connection between databse and mongoose,db is gonna be usedd to acces the database
const db = mongoose.connection;

// error
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running, once the connection (db) is open to access the database
db.once("open", function () {
  console.log(
    "*********** --Succesfully connected to the database-- ***************"
  );
});
