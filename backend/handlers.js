"use strict";
const { uuid } = require("uuidv4");
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


// POST ADD a new product to sell 
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

    const item = {
      _id: uuid(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageSrc: req.body.imageSrc,
      numInStock: req.body.numInStock,
      userId: req.body.userId, //from where should come userId
    };

    const newItem = await db.collection("items").insertOne(item);
    //   await db.collection("users").insertOne(users);
    console.log(newItem);

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
