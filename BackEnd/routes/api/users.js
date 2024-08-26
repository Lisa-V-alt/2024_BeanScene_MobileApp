// Importing necessary modules
const express = require("express");
const { User } = require("../../config"); // Importing the User model from the config file
const routes = express.Router(); // Creating an instance of an Express Router

// Route for fetching all users
routes.get("/", async (req, res) => {
  // Fetching all users from the database
  const result = await User.get();
  // Mapping the retrieved user documents to a simplified format
  const list = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // Sending the list of users as response
  res.send(list);
});

// Route for creating a new user
routes.post("/create", async (req, res) => {
  // Adding the new user to the database
  await User.add(req.body);
  // Sending success message as response
  res.send({ msg: "Staff added successfully." });
});

// Route for updating an existing user
routes.put("/update/:user_id", async (req, res) => {
  const id = req.params.user_id;
  delete req.body.id; // Removing id from the request body
  // Updating the user with the provided ID
  await User.doc(id).update(req.body);
  // Sending success message as response
  res.send({ msg: "Staff updated successfully." });
});

// Route for deleting a user
routes.delete("/delete/:user_id", async (req, res) => {
  const id = req.params.user_id;
  // Deleting the user with the provided ID
  await User.doc(id).delete();
  // Sending success message as response
  res.send({ msg: "Staff deleted successfully." });
});

// Exporting the routes for use in other files
module.exports = routes;
