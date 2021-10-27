import express from "express";
import { signupBuyer } from "./buyer-controller";

const router = express.Router();

router.get("/buyer", (req, res) => {
  res.json({ message: "success" });
});

router.post("/buyer", signupBuyer);

export { router as buyerRoutes };
