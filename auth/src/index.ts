import { app } from "./app";
import mongoose from "mongoose";
import { redisWrapper } from "./redisWrapper";
import { natsWrapper } from "./natsWrapper";

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI must be defined");
  }
  if (!process.env.REDIS_HOST) {
    throw new Error("Redis URI must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("Redis URI must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("Redis URI must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("Redis URI must be defined");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("connecting to the database");

    redisWrapper.connect(process.env.REDIS_HOST);

    app.listen(3000, () => {
      console.log("running on port 3000");
    });
  } catch (err) {
    console.error(err);
  }
};

start();
