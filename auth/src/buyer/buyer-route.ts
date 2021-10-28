import express from "express";
import { signupBuyer, loginBuyer, getBuyer } from "./buyer-controller";
import { isAuth } from "../middlewares/isAuth";

const router = express.Router();

router.get("/buyer", isAuth, getBuyer);

router.post("/buyer", signupBuyer);

router.post("/buyer/login",  loginBuyer);

export { router as buyerRoutes };
