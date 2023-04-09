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

// POST ADD a new user
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
      userSales: [],
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
      userId: req.body.userId, 
    };

    const newItem = await db.collection("items").insertOne(item);
    //   await db.collection("users").insertOne(users);
    console.log(newItem);

   
//     const findMatchUserIdIn2Collections = await db
//     .collection("users")

//     // Not sure I'm doing it correctly here: 
//     // How to search if _id in 'users' collection (which is user email) matches userId 
//     // in 'items' collection (which is also a user email)? When a user adds a product to sell, 
//     // in 'items' collection, I want at the same time this newly added item _id to appear in the field 'productsToSell'
//     // in another collection caled 'users'  
//     .findOne({ _id: req.body.userId }); 
//   if (!findMatchUserIdIn2Collections) {
//     return res
//       .status(404)
//       .json({ status: 404, message: "Unable to find such userId" });
//   }

  // adds id of a newly added product (to 'items' collection)  to 'users' collection as well (into the field 'productsToSell')
  const addNewItemIdToUsersCollection = await db
//   console.log(_id)
//   console.log(userId)
//   console.log(item._id)
//   console.log(item.userId)
//   console.log(user._id)
//   console.log(req.body.userId)
//   console.log(req.body._id)

  .collection("users")
  .updateOne({ _id: req.body.userId }, {$push: { productsToSell: itemId}}); //How to put here _id of item (not of user)?
//   console.log(userId)
//   console.log(data._id)
console.log(addNewItemIdToUsersCollection)
if (addNewItemIdToUsersCollection.modifiedCount === 0) {
  return res
    .status(400)
    .json({ status: 400, message: "Error making update" });
}

    res.status(200).json({
      status: 200,
      message: "New product has been successfully added",
    //   userId: req.body.email,
    });



  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
  client.close();
};



module.exports = {
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
};
