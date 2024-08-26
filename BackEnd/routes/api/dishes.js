// Importing necessary modules
const express = require("express");
const path = require("path");
const { Dishes } = require("../../config"); // Importing the Dishes model from the config file
const routes = express.Router(); // Creating an instance of an Express Router
const multer = require("multer");

// Configuring multer for file uploads
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("images/")); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".png"); // Naming convention for uploaded files
  },
});
const upload = multer({ storage: storage });

// Route for fetching all dishes
routes.get("/", async (req, res) => {
  // Fetching all dishes from the database
  const result = await Dishes.get();
  // Mapping the retrieved dish documents to a simplified format
  const list = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // Sending the list of dishes as response
  res.send(list);
});

// Route for creating a new dish
routes.post("/create", upload.single("file"), async (req, res) => {
  if (req.file) {
    await Dishes.add({ ...req.body, file: req.file.filename });
  } else {
    await Dishes.add({ ...req.body, file: "" });
  }
  // Sending success message as response
  res.send({ msg: "Dish added successfully." });
});

// Route for updating an existing dish
routes.put("/update/:Dishes_id", upload.single("file"), async (req, res) => {
  const id = req.params.Dishes_id;
  delete req.body.id; // Removing id from the request body
  if (req.file) {
    await Dishes.doc(id).update({ ...req.body, file: req.file.filename });
  } else {
    await Dishes.doc(id).update(req.body);
  }
  // Sending success message as response
  res.send({ msg: "Dish updated successfully." });
});

// Route for deleting a dish
routes.delete("/delete/:Dishes_id", async (req, res) => {
  const id = req.params.Dishes_id;
  // Deleting the dish with the provided ID
  await Dishes.doc(id).delete();
  // Sending success message as response
  res.send({ msg: "Dish deleted successfully." });
});

// Exporting the routes for use in other files
module.exports = routes;
