import { RequestHandler } from "express";
import { Buyer, BuyerState, UserPrivilage } from "../buyer-model";
import {
  comparePwd,
  existingUser,
  generateJwtBuyer,
  hashPwd,
} from "../utils/buyer-utils";
import jwt from "jsonwebtoken";
import { UserPayload } from "../../middlewares/isAuth";

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
    state: BuyerState.Active,
    privilage: UserPrivilage.Standard,
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

  if (user.state == BuyerState.Banned) {
    throw new Error("Banned user");
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

export const refreshTokenBuyer: RequestHandler = async (req, res) => {
  const { refreshToken } = req.body;
  const payload = jwt.verify(refreshToken, "my refresh") as UserPayload;

  const user = await existingUser(payload.email);
  if (!user) {
    throw new Error("User does not exist");
  }

  if (user.state == BuyerState.Banned) {
    throw new Error("User is banned");
  }
  const { accessToken } = generateJwtBuyer(user);
  req.session = {
    accessToken: accessToken,
  };

  res.status(200).json(user);
};
