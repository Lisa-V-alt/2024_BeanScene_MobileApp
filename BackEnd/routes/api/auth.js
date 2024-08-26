// Importing the necessary modules
const express = require("express");
const { User } = require("../../config"); // Importing the User model from the config file
const routes = express.Router(); // Creating an instance of an Express Router

// Route for handling user login
routes.post("/login", async (req, res) => {
  // Fetching all users from the database
  const result = await User.get();
  // Mapping the retrieved user documents to a simplified format
  const list = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // Finding the user with the provided email and password
  const user = list.find(
    (x) => x.email == req.body.email && x.password == req.body.password
  );
  // Responding based on whether the user is found or not
  if (user) {
    res.send({
      success: true,
      data: user,
      message: "User logged in successfully.",
    });
  } else {
    res.send({
      success: false,
      data: user, // Sending null since user was not found
      message: "Email or password is wrong.",
    });
  }
});

// Exporting the routes for use in other files
module.exports = routes;
