import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDb = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("connected to mongodb");
  } catch (error) {
    console.log("connection error!", error);
    throw error;
  }
};
