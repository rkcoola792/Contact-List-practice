
const express = require("express");
const port = 8000;
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.static("assets"));
app.use(express.urlencoded());

var contactLists = [
  {
    name: "Rajeev",
    phoneNumber: "87465546",
  },
  {
    name: "Deeps",
    phoneNumber: "231547",
  },
  {
    name: "Mayank",
    phoneNumber: "7931328",
  },
];

app.get("/", function (req, res) {
  res.render("home", {
    title: "Contact List",
    contact_list: contactLists,
  });
});

app.post("/create-contact", function (req, res) {
  contactLists.push(req.body);
  res.redirect("back");
});

// deleting from array
app.get("/delete-contact/", (req, res) => {

    // using query params to ge the form data
    console.log(req.query);
    let phone = req.query.phoneNumber;
  
    // finding in contact index
    let contactIndex = contactLists.findIndex((contact) => contact.phoneNumber == phone);
  
    if (contactIndex != -1) {
      contactLists.splice(contactIndex, 1);
    }
  
    return res.redirect("back");
  });
  

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Yeah, the server is running on port :", port);
});
