const express = require("express");
const morgan = require("morgan");

const {
  addUser,
  userLoginHandler,
  addProductAsSeller,
  deleteProductAsSeller,
  getTwelveItems,
  getItem,
  getItems,
  getUsers,
  getUser,
  addItemToCart,
  getUserCart,
  // getItemsByCategory,
  // getOrder,
  // updateCart,
  // confirmOrder,
  // deleteItem,
  // deleteCart,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // add extra endpoints here 
  /*********************************************************/

// POST endpoint for adding a new user through SingUp
.post("/user", addUser)

// Post endpoint for user login functionality 
.post("/user/login", userLoginHandler)

// POST endpoint which allows a user to add a new product to sell as a seller
  .post("/users/additemasseller", addProductAsSeller)

// DELETE endpoint which allows a user to delete a product he is selling
.delete("users/:userId/delete-item-as-seller/:_id", deleteProductAsSeller)

// GET endpoint to show 12 items to show on Homepage
  .get("/getTwelveItems", getTwelveItems)

// GETs an item based on item _id
  .get("/getItem/:_id", getItem)

// GETs all the items
  .get("/getItems", getItems)

// GETS all the users
  .get("/users", getUsers)

// GETS a single user based on _id
  .get("/users/:_id", getUser)

// POST adds item to cart
  .post("/add-item-to-cart", addItemToCart)

// GETs the cart with all the items information based on userId
  .get("/users/:userId/cart", getUserCart)


//   .get("/getItems/:category", getItemsByCategory)


//   .get("/:userId/confirmation/:orderId", getOrder)

//   .patch("/update-cart", updateCart)

//   .post("/:userId/confirmation/:orderId", confirmOrder)

//   .delete("/delete-item/:_id", deleteItem)
//   .delete("/delete-cart", deleteCart)


  /*********************************************************/
  .listen(8050, () => console.info(`Listening on port 8050`));

