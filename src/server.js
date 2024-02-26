import connectDB from "./db/index.db.js";

import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

connectDB();

/*import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR !!", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is running ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
})();
*/
