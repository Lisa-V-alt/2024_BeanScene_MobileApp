// Importing necessary modules
const express = require("express");
const { Category } = require("../../config"); // Importing the Category model from the config file
const routes = express.Router(); // Creating an instance of an Express Router

// Route for fetching all categories
routes.get("/", async (req, res) => {
  // Fetching all categories from the database
  const result = await Category.get();
  // Mapping the retrieved category documents to a simplified format
  const list = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // Sending the list of categories as response
  res.send(list);
});

// Route for creating a new category
routes.post("/create", async (req, res) => {
  // Adding the new category to the database
  await Category.add(req.body);
  // Sending success message as response
  res.send({ msg: "Category added successfully." });
});

// Route for updating an existing category
routes.put("/update/:category_id", async (req, res) => {
  const id = req.params.category_id;
  delete req.body.id; // Removing id from the request body
  // Updating the category with the provided ID
  await Category.doc(id).update(req.body);
  // Sending success message as response
  res.send({ msg: "Category updated successfully." });
});

// Route for deleting a category
routes.delete("/delete/:category_id", async (req, res) => {
  const id = req.params.category_id;
  // Deleting the category with the provided ID
  await Category.doc(id).delete();
  // Sending success message as response
  res.send({ msg: "Category deleted successfully." });
});

// Exporting the routes for use in other files
module.exports = routes;
