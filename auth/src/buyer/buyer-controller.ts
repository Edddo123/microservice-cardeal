import { RequestHandler } from "express";
import { Buyer } from "./buyer-model";
import {
  comparePwd,
  existingUser,
  generateJwtBuyer,
  hashPwd,
} from "./buyer-utils";

export const signupBuyer: RequestHandler = async (req, res) => {
  const { email, password, personalId } = req.body;

  const duplicateEmail = await existingUser(email);
  if (duplicateEmail) {
    throw new Error("email already exists");
  }

  const hashedPassword = await hashPwd(password);

  const buyer = new Buyer({
    email,
    password: hashedPassword,
    personalId,
  });

  await buyer.save();

  res.status(201).json(buyer);
};

export const loginBuyer: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await existingUser(email);
  if (!user) {
    throw new Error("user with that email does not exist");
  }

  const correctPwd = await comparePwd(password, user.password);
  if (!correctPwd) {
    throw new Error("wrong password");
  }

  const { accessToken, refreshToken } = generateJwtBuyer(user);

  req.session = {
    accessToken,
  };

  res.status(200).json({ accessToken, refreshToken });
};

export const getBuyer: RequestHandler = async (req, res) => {
  const email = req?.currentUser?.email;
  // we check on middleware so email is there for sure
  const buyer = await existingUser(email!);

  if (!buyer) {
    throw new Error("Such user doesnt exist");
  }

  res.status(200).json({
    buyer,
  });
};
