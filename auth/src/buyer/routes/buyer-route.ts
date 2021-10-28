import express from "express";
import {
  signupBuyer,
  loginBuyer,
  getBuyer,
  refreshTokenBuyer,
} from "../controllers/buyer-controller";
import { isAuth } from "../../middlewares/isAuth";

const router = express.Router();

router.get("/buyer", isAuth, getBuyer);

router.post("/buyer", signupBuyer);

router.post("/buyer/login", loginBuyer);

router.post("/buyer/refresh", refreshTokenBuyer);

export { router as buyerRoutes };
