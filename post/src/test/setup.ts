import { MongoMemoryServer } from "mongodb-memory-server"; // we will use mongo in memory server to quickly access it for tests
import mongoose from "mongoose";



let mongo: MongoMemoryServer;


beforeAll(async () => {
//   process.env.JWT_KEY = "12";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
