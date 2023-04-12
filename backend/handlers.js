"use strict";
// const { uuid } = require("uuidv4");
const { v4: uuidv4 } = require("uuid");
const { MongoClient, LEGAL_TLS_SOCKET_OPTIONS, Long } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// POST ADD a new user via SignUp
const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("organicPlace");
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.phoneNumber ||
      !req.body.address ||
      !req.body.userAvatar ||
      !req.body.password ||
      !req.body.confirmPassword
    ) {
      return res
        .status(409)
        .json({
          status: 409,
          data: "Missing information. All fields are mandatory",
        });
    }

    const user = {
      _id: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      userAvatar: req.body.userAvatar,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      cart: [],
      productsToSell: [],
      userPurchases: [],
      userSales: []
    };

    const newUser = await db.collection("users").insertOne(user);
    //   await db.collection("users").insertOne(users);
    console.log(newUser);

    res.status(200).json({
      status: 200,
      message: "New user has been successfully created",
      userId: req.body.email,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
  client.close();
};

// POST login functionality (check if email & password from user input match the ones in our database)
const userLoginHandler = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("organicPlace");
    if (!req.body.email || !req.body.password) {
      return res
        .status(409)
        .json({
          status: 409,
          data: "Missing information. All fields are mandatory",
        });
    }

    const userTryingToLogin = {
      email: req.body.email,
      // password: req.body.password
    };

    const existingUser = await db
      .collection("users")
      .findOne(userTryingToLogin);
    console.log(existingUser);
    console.log(req.body.email);

    if (
            // both email and password match and we login
      req.body.email === existingUser._id &&
      req.body.password === existingUser.password
    ) {
      return res.status(200).json({
        status: 200,
        message: "User has been successfully logged in",
        userId: req.body.email,
        user: existingUser
      });
    } else if (
      req.body.email === existingUser._id &&
      !(req.body.password === existingUser.password)
    ) {
      // email matches but password doesn;t match
      return res
        .status(401)
        .json({
          status: 401,
          data: "Your email and password don't match. Enter correct email and password please",
        });
    } else if (!existingUser) {
      // user not found
      return res
        .status(409)
        .json({
          status: 409,
          data: "Wrong email. Enter the correct email please",
        });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: "User not found" });
  }
  client.close();
};


// POST ADDs a new product to sell to 'items' collection
// and adds a new prodict id to the field 'productsToSell' of 'users' collection
const addProductAsSeller = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("organicPlace");
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.price ||
      !req.body.category ||
      !req.body.imageSrc ||
      !req.body.numInStock
    ) {
      return res
        .status(409)
        .json({
          status: 409,
          data: "Missing information. All fields are mandatory",
        });
    }

    const itemId = uuidv4();
    const item = {
      _id: itemId,
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      imageSrc: req.body.imageSrc,
      numInStock: Number(req.body.numInStock),
      userId: req.body.userId 
    };

    const newItem = await db.collection("items").insertOne(item);
    console.log(newItem);

  // adds id of a newly added product (to 'items' collection)  to 'users' collection as well (into the field 'productsToSell')
  const addNewItemIdToUsersCollection = await db
//   console.log(_id)

  .collection("users")
  .updateOne({ _id: req.body.userId }, {$push: { productsToSell: itemId}}); //How to put here _id of item (not of user)?
//   console.log(userId)
console.log(addNewItemIdToUsersCollection)
if (addNewItemIdToUsersCollection.modifiedCount === 0) {
  return res
    .status(400)
    .json({ status: 400, message: "Error making update" });
}

    res.status(200).json({
      status: 200,
      message: "New product has been successfully added",
    });



  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
  client.close();
};

// DELETE  which allows a user to delete a product he is selling.
// Endpoint looks like below:
// .delete("users/:userId/delete-item-as-seller/:_id", deleteProductAsSeller)
const deleteProductAsSeller = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
      await client.connect();
      const db = client.db("organicPlace");
      const itemId = req.params._id;
  
      const deleteItemFromItemsCollection = await db
        .collection("items")
        .deleteOne({ _id: itemId });
  
      // updates/deletes 'productsToSell' field in 'users' collection
      const deleteItemFromUsersCollection = await db.collection("users")
      .findOne({ _id: itemId })
      .deleteOne({ _id: itemId });

  
    //   const query1 = { _id: itemId };
    //   const update1 = {
    //     $set: { numInStock: findItem.numInStock + Number(req.body.quantity) },
    //   };
    //   const itemStockUpdate = await db
    //     .collection("items")
    //     .updateOne(query1, update1);
  
      res.status(200).json({
        status: 200,
        message: "Item deleted from items and users collections",
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
      client.close();
    }
    client.close();
  };

// GETs 12 items to render on Homepage
  const getTwelveItems = async (req, res) => {
    const { start, limit } = req.query;
  
    //returns only 12 results to be shown on Homepage
    const resultsItemsLimit = Number(limit) ?? 12;
  

    console.log("resultsItemsLimit: ", resultsItemsLimit)
    try {
      // creates a new client/mongo
      const client = new MongoClient(MONGO_URI, options);
  
      // connect to the client
      await client.connect();
  
      const db = client.db("organicPlace");
      console.log("connected!");

      const result = await db
      .collection("items")
      .find()
      .skip(start - 1)
      .limit(resultsItemsLimit)
      .toArray();
  
      console.log("result", result)

      if (result) {
  
        return res.status(200).json({ status: 200, data: result.slice(0, 12) });
      } else {
        return res.status(404).json({ status: 404, _id, data: [] });
      }
    } catch (err) { // on failure/error, send
    res.status(500).json({ status: 500, data: req.body, message: err.message });
      console.log(err);
    }
    client.close();
  };


    //Gets a specific item based on it's _id
    const getItem = async (req, res) => {
        const myId = req.params._id;
        const client = new MongoClient(MONGO_URI, options);
        try {
          await client.connect();
          const db = client.db("organicPlace");
          console.log("connected item!");

          const itemById = await db
            .collection("items")
            .findOne({ _id: myId });
      
          itemById
            ? res.status(200).json({ status: 200, data: itemById })
            : res.status(400)
                .json({ status: 400, data: myId, message: "Item wasn't found in database" });
        } catch (error) {
          res.status(500).json({ status: 500, message: error });
        //   client.close();
        }
        client.close();
      };


  // Gets all items
const getItems = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
      await client.connect();
      const db = client.db("organicPlace");
  
      const items = await db.collection("items").find().toArray();
      items
        ? res.status(200).json({ status: 200, data: items })
        : res
            .status(400)
            .json({ status: 400, message: "Items not found in database" });
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
      client.close();
    }
    client.close();
  };
  

//Gets all users
const getUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
      await client.connect();
      const db = client.db("organicPlace");
  
      const allUsers = await db.collection("users").find().toArray();
      allUsers
        ? res.status(200).json({ status: 200, data: allUsers })
        : res
            .status(400)
            .json({ status: 400, message: "Users not found in database" });
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
      client.close();
    }
    client.close();
  };
  
  //Gets a single user based on _id. Endpoint looks like below:
  //  .get("/users/:_id", getUser)
  const getUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
      await client.connect();
      const db = client.db("organicPlace");
      const myId = req.params._id;
      const companyById = await db
        .collection("users")
        .findOne({ _id: myId });
  
      companyById
        ? res.status(200).json({ status: 200, data: companyById })
        : res
            .status(400)
            .json({ status: 400, data: myId, message: "User not found in database" });
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
      client.close();
    }
    client.close();
  };
  


  // POST adds item to user's cart based on userId
//   For endpoint: .post("/add-item-to-cart", addItemToCart)
// POST add to cart
const addItemToCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
      await client.connect();
      const db = client.db("organicPlace");
  
    //   // this verifies that the item _id exist
    //   const itemId = req.body._id;
    //   const findItem = await db.collection("items").findOne({ _id: itemId });
    //   if (!findItem) {
    //     return res.status(400).json({ status: 400, data: "Item doesn't exist" });
    //   }
    //   // this verifies that the item is in stock
    //   if (findItem.numInStock < req.body.quantity) {
    //     return res.status(400).json({ status: 400, data: "Item is not in stock" });
    //   }
  
    //   // this checks if item already exists in cart. 
    //   //How to find itemId in 'users' collection field called 'cart'?
    //   // 
    //   const findCart = await db.collection("users").find().toArray();
    //   const itemFind = findCart.find((item) => {
    //     return item._id === itemId;
    //   });
  
      // this updates quantity if item already exist in cart and updates stock as well
    //   if (itemFind) {

        const query = { _id: req.body.email };

        const oldCart = await db
        .collection("users")
        .findOne(query);
        console.log(oldCart)
        console.log(req.body._id)
        const updatedCart = [...oldCart.cart, {item: req.body._id, quantity: 1}]
        
        const update = {
          $set: { cart: updatedCart },
        };

        // what to do if my data/collections structure has no 'quantity' for cart?
        // Currently 'item' object had the field numInStock and 'user' object has the field 'cart'
        // where will be just item ids when a user adds to cart an item? 
        // Should I create the collection called 'cart' as we deed in a group project,
        // but in the group project we had no registered users. But now in my case of 
        // a marketplace, every user has the field 'cart' in 'user' object.  
        const updateQuantity = await db
          .collection("users")
          .updateOne(query, update);
  
        // const query2 = { _id: itemId };
        // const update2 = {
        //   $set: { numInStock: findItem.numInStock - Number(req.body.quantity) },
        // };

        // const itemStockUpdate = await db
        //   .collection("items")
        //   .updateOne(query2, update2);
  
        return res.status(200).json({
          status: 200,
          message: "Cart has been updated",
        });
      
  
    //   // this adds new item to cart and updates stock
    //   const newAddToCart = await db.collection("users").insertOne(req.body);
  
    //   const query1 = { _id: itemId };
    //   const update1 = {
    //     $set: { numInStock: findItem.numInStock - Number(req.body.quantity) },
    //   };
  
    //   const itemStockUpdate = await db
    //     .collection("items")
    //     .updateOne(query1, update1);
    //   ///////////////
  
    //   res.status(200).json({
    //     status: 200,
    //     message: "New item has been added to cart",
    //   });
    } catch (error) {
        console.log(error.message)
      res.status(500).json({ status: 500, message: error.message });
    }
    client.close();
  };


// GETs the cart with all the items information based on userId
//  Endpoint for this handler: .get("/users/:userId/cart", getUserCart)

const getUserCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
      await client.connect();
      console.log("connected getUserCart")
      const db = client.db("organicPlace");
  console.log("req.params.userId", req.params.userId)

      const result = await db.collection("users").findOne({_id: req.params.userId});

    //   console.log("result", result)
      if (result) {
        
        return res.status(200).json({ status: 200, data: result.cart })
      } else {
        return res.status(404).json({ status: 404, message: "Not Found" });
      }

    //   result
    //     ? res.status(200).json({ status: 200, data: result.cart })
    //     : res.status(404).json({ status: 404, message: "Not Found" });
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
    //   client.close();
    }
    client.close();
  };


module.exports = {
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
};
