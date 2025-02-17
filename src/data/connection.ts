/**
 * Date created: 26/01/2024
 * License: MIT
 *
 * This is the connection file. It's used to connect to MongoDB. For obvious reasons this file isn't in any of my public repo's
 * If you get your hands on this file, I probably trust you <3. Please leak nothing.
 * Feel free to use it at your behest!
 *
 * Note: NEVER USE NATIVE MONGODB WITH MONGOOSE EVEN FOR TESTING. I tried it. You'll end up with connection errors if you're using nodemon even if you're not running the test code.
 *
 * @method createMongooseConnection : async (callback: () => void) => Promise<void>
 * @method closeMongooseConnection : async () => Promise<void>
 */

// Import Mongoose
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MongoDB url
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const DATA_API_KEY_NAME = process.env.DATA_API_KEY_NAME;
const DATA_API_KEY = process.env.DATA_API_KEY;
const API_ENDPOINT = process.env.API_ENDPOINT;

// MongoDB Uri
// Note: To create this URL, copy the connect content and replace the rewrite with the url of the database
const SESSION_URI = process.env.SESSION_URI;

// Create our Mongoose connection. Mongoose is an ODM which is basically an ORM but for collections instead of tables/schemas
const createMongooseConnection = async (callback: () => void) => {
  // Connect to our MongoDB using Mongoose.
  // We use the unknown type for our error because it's either that or any
  await mongoose.connect(MONGODB_URI).catch((error: unknown) => {
    // Clear the console in the terminal/browser and display it
    console.clear();
    console.error(error);
  });

  // Execute our fallback, in this case, it'll be our connection to the local server. We do this via express.js
  callback();
};

// Disconnect from our Mongoose connection for whatever reason
const closeMongooseConnection = async () => {
  await mongoose.disconnect();
};

export {
  createMongooseConnection,
  closeMongooseConnection,
  SESSION_URI,
  MONGODB_URI,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  DATA_API_KEY_NAME,
  DATA_API_KEY,
  API_ENDPOINT,
};
