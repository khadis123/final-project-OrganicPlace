const express = require("express");
const morgan = require("morgan");

const {
  addUser,
  userLoginHandler,
  addProductAsSeller,
  // getItems,
  // getItem,
  // getItemsByCategory,
  // getCompanies,
  // getCompany,
  // getCart,
  // getOrder,
  // addCart,
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

//   .get("/getItems", getItems)
//   .get("/getItem/:_id", getItem)
//   .get("/getItems/:category", getItemsByCategory)

//   .get("/users", getUsers)
//   .get("/users/:_id", getUser)

// POST endpoint for user to add product to sell as a seller
  .post("/users/additemasseller", addProductAsSeller)

// POST endpoint for adding a new user through SingUp
  .post("/user", addUser)

  // Post endpoint for user login functionality 
  .post("/user/login", userLoginHandler)
//   .get("/cart", getCart)

//   .get("/confirmation/:orderId", getOrder)

//   .post("/add-item", addCart)
//   .patch("/update-cart", updateCart)

//   .post("/confirmation", confirmOrder)


//   .delete("/delete-item/:_id", deleteItem)
//   .delete("/delete-cart", deleteCart)


  /*********************************************************/
  .listen(8050, () => console.info(`Listening on port 8050`));

