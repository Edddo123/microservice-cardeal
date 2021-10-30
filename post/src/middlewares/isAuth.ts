import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Buyer, UserPrivilage } from "../buyer/buyer-model";
// import { getDataRedis } from "../buyer/utils/redis-utils";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export interface UserPayload {
  email: string;
  id: string;
  signedUp: string;
}

export const isAuth: RequestHandler = async (req, res, next) => {
  if (!req.session?.accessToken) {
    throw new Error("Not authorzied1");
  }

  try {
    const payload = jwt.verify(
      req.session.accessToken,
      "my secret"
    ) as UserPayload;

    // const banned = await getDataRedis()(payload.id);
    // if (banned) {
    //   throw new Error("user banned");
    // }

    req.currentUser = payload;
    return next();
  } catch (err) {
    throw new Error("Not authorzied2");
  }
};

/* Buyer admin check */
export const isAdminAuth: RequestHandler = async (req, res, next) => {
  if (!req.session?.accessToken) {
    throw new Error("Not authorzied1");
  }

  try {
    const payload = jwt.verify(
      req.session.accessToken,
      "my secret"
    ) as UserPayload;

    const buyer = await Buyer.findById(payload.id);
    if (buyer?.privilage != UserPrivilage.Admin) {
      throw new Error("Not authorized");
    }

    req.currentUser = payload;
    return next();
  } catch (err) {
    throw new Error("Not authorized");
  }
};
