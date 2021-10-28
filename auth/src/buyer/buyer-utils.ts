import bcrypt from "bcrypt";
import { Buyer } from "./buyer-model";
import jwt from "jsonwebtoken";
import { BuyerInterface } from "./buyer-model";

export const hashPwd = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
};

export const existingUser = async (email: string) => {
  const buyer = await Buyer.findOne({ email });
  return buyer;
};

export const comparePwd = async (password: string, hashedPwd: string) => {
  return await bcrypt.compare(password, hashedPwd);
};

export const generateJwtBuyer = (buyer: BuyerInterface) => {
  const accessToken = jwt.sign(
    {
      email: buyer.email,
      id: buyer._id,
      signedUp: buyer.createdAt,
    },
    "my secret",
    {
      expiresIn: "1d",
    }
  );

  const refreshToken = jwt.sign(
    {
      email: buyer.email,
      id: buyer._id,
      signedUp: buyer.createdAt,
    },
    "my refresh",
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};
