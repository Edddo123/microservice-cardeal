import { redisWrapper } from "../redisWrapper";
import { promisify } from "util";

interface RedisFunctions {
  SetFn(
    key: string,
    value: string,
    options?: string,
    duration?: number
  ): Promise<"OK">;

  GetFn(key: string): Promise<string>;

  DelFn(ket: string): Promise<Error | number>;
}
// RedisFunctions["SetFn"]
export const setDataRedis = () => {
  return promisify(redisWrapper.client.set).bind(
    redisWrapper.client
  ) as RedisFunctions["SetFn"];
};

export const getDataRedis = () => {
  return promisify(redisWrapper.client.get).bind(
    redisWrapper.client
  ) as RedisFunctions["GetFn"];
};

export const deleteDataRedis = () => {
  return promisify(redisWrapper.client.del).bind(
    redisWrapper.client
  ) as RedisFunctions["DelFn"];
};
