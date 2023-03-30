const express = require("express");
const morgan = require("morgan");

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

//   .get("/companies", getUsers)
//   .get("/companies/:_id", getUser)

//   .get("/cart", getCart)

//   .get("/confirmation/:orderId", getOrder)

//   .post("/add-item", addCart)
//   .patch("/update-cart", updateCart)

//   .post("/confirmation", confirmOrder)

//   .delete("/delete-item/:_id", deleteItem)
//   .delete("/delete-cart", deleteCart)


  /*********************************************************/
  .listen(8050, () => console.info(`Listening on port 8050`));
