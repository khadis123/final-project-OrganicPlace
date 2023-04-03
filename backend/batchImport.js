const { MongoClient } = require("mongodb");
const users = require("./data/users.json");
const items = require("./data/items.json");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const batchImport = async () => {
//   const client = new MongoClient(MONGO_URI, options);
//   try {
//     await client.connect();
//     console.log("connected to mongoDB");
//     const db = client.db("organicPlace");

//     await db.collection("users").insertMany(users);
//     await db.collection("items").insertMany(items);

//   } catch (error) {
//     console.log("error");
//   }

//   client.close();
//   console.log("Disconnected from mongoDB");
// };

// batchImport();

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("organicPlace");
  
    // await db.collection("users").insertMany(users);
    await db.collection("items").insertMany(items);
  
    client.close();
  };
  
  batchImport();