import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const ConnectInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`\n DB CONNECT!!!! DB HOST:${ConnectInstance.connection.host}`);
  } catch (err) {
    console.error("Error", err);
    process.exit(1);
  }
};

export default connectDB;
