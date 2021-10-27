import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI must be defined");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("connecting to the database");

  app.listen(3000, () => {
    console.log("running on port 3000");
  });
}; 

start();
