import { RequestHandler } from "express";
import { redisWrapper } from "../../redisWrapper";
import { Buyer, BuyerState } from "../buyer-model";
import { setDataRedis } from "../utils/redis-utils";

export const banBuyer: RequestHandler = async (req, res) => {
  const { buyerId } = req.body;

  const user = await Buyer.findById(buyerId);
  if (!user) {
    throw new Error("No user found");
  }

  user.state = BuyerState.Banned;
  await user.save();

  await setDataRedis()(user._id.toString(), "banned", "EX", 60); // expiry time must match access token living time

  res.status(200).json(user);
};
