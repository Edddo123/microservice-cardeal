import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

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
  signedUp: string
}



export const isAuth: RequestHandler = (req, res, next) => {
  if (!req.session?.accessToken) {
    throw new Error("Not authorzied1");
  }

  try {
    const payload = jwt.verify(req.session.accessToken, 'my secret') as UserPayload;
    req.currentUser = payload;
    return next();
  } catch (err) {
    throw new Error("Not authorzied2");
  }
};
