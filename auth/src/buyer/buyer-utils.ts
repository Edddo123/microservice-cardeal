import bcrypt from "bcrypt";
import { Buyer } from "./buyer-model";

export const hashPwd = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
};

export const existingEmail = async (email: string) => {
  const buyer = await Buyer.findOne({ email });
  return buyer;
};
