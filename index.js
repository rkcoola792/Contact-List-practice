
const express = require("express");
const port = 8000;
const path = require("path");

const db = require("./config/mongoose");
const Contact = require("./model/contact");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.static("assets"));
app.use(express.urlencoded());

// handling the get request for home
app.get("/", function (req, res) {
  
  //   Fetching the documents from database
  Contact.find({}, (err, contacts) => {
    if (err) {
      console.log(
        "******* ----Error in fetching the data from the db---- ******"
      );
      return;
    }
    res.render("home", {

      // context variable passing 
      title: "Contact List",
      contact_list: contacts,
    });
  });
});

// hadling the post request for creating a contact
app.post("/create-contact", function (req, res) {
  
  // adding to the database
  Contact.create(
    {
      //follows schema
      name: req.body.name,
      phone: req.body.phoneNumber,
    },
    (err, newContact) => {
      if (err) {
        console.log("error in adding a document to the database");
        return;
      } else {
        console.log("*********", newContact, "*********");
        return res.redirect("back");
      }
    }
  );
});

// deleting from array
app.get("/delete-contact/", (req, res) => {
  // using query params to ge the form data
  let id = req.query.id;

  //find the contact in the database using id that needs to be deleted
  Contact.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(
        "********** ----Error in deleting the contact from the database---- ********"
      );
      return;
    }
    return res.redirect("back");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Yeah, the server is running on port :", port);
});
