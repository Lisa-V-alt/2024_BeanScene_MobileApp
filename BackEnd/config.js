const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyCINZ0efQUYv_588y_uwaxOgMpZFsFOO5Q",
  authDomain: "food-app-fa0fd.firebaseapp.com",
  projectId: "food-app-fa0fd",
  storageBucket: "food-app-fa0fd.appspot.com",
  messagingSenderId: "1049057631117",
  appId: "1:1049057631117:web:1d881dd376aed5eee23bc4"
};
//:)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("users");
const Category = db.collection("categories");
const Dishes = db.collection("dishes");
const Orders = db.collection("orders");
module.exports = { User, Category, Dishes, Orders };