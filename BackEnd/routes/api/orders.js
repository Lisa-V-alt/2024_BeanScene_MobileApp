// Importing necessary modules
const { json } = require("body-parser");
const express = require("express");
const { Orders } = require("../../config"); // Importing the Orders model from the config file
const routes = express.Router(); // Creating an instance of an Express Router

// Route for fetching all orders
routes.get("/", async (req, res) => {
  // Fetching all orders from the database
  const result = await Orders.get();
  // Mapping the retrieved order documents to a simplified format
  const list = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // Sending the list of orders as response
  res.send(list);
});

// Route for creating a new order
routes.post("/create", async (req, res) => {
  // Adding the new order to the database
  await Orders.add(req.body);
  // Sending success message as response
  res.send({ msg: "Orders added successfully." });
});

// Route for updating existing orders
routes.put("/update/:order_id", async (req, res) => {
  // Updating each order provided in the request body
  req.body.map(async (x) => {
    await Orders.doc(x.id).update(x);
  });
  // Sending success message as response
  res.send({ msg: "Orders updated successfully." });
});

// Route for deleting an order
routes.delete("/delete/:order_id", async (req, res) => {
  const id = req.params.order_id;
  // Deleting the order with the provided ID
  await Orders.doc(id).delete();
  // Sending success message as response
  res.send({ msg: "Orders deleted successfully." });
});

// Exporting the routes for use in other files
module.exports = routes;
