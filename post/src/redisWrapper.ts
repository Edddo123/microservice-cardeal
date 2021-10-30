import { RedisClient } from "redis";
import redis from "redis";

console.log("here345");


export class RedisWrapper {
  private _client?: RedisClient;

  get client() {
    if (!this._client) {
      console.log("whats client", this._client);
      throw new Error("Cannot access Redis before connecting");
    }
    return this._client;
  }

  connect(host: string): void {
    this._client = redis.createClient(host);

    this._client.on("error", function (error) {
      console.log("redis error", error);
      throw new Error("redis connection failed");
    });
    console.log("connected to redis");
  }
}

const redisWrapper = new RedisWrapper();

export { redisWrapper };
