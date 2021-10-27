import { RequestHandler } from "express";
import { Buyer } from "./buyer-model";
import { existingEmail, hashPwd } from "./buyer-utils";

export const signupBuyer: RequestHandler = async (req, res) => {
  const { email, password, personalId } = req.body;

  const duplicateEmail = await existingEmail(email);
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
