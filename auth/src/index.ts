import { app } from "./app";
import mongoose from "mongoose";
import { redisWrapper } from "./redisWrapper";

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI must be defined");
  }
  if (!process.env.REDIS_HOST) {
    throw new Error("Redis URI must be defined");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("connecting to the database");
  
  redisWrapper.connect(process.env.REDIS_HOST);
  
  app.listen(3000, () => {
    console.log("running on port 3000");
  });
};

start();
