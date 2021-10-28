import express from "express";
import { banBuyer } from "../controllers/buyer-admin";
import { isAdminAuth } from "../../middlewares/isAuth";

const router = express.Router();

router.put("/buyer/ban", isAdminAuth, banBuyer);

export { router as buyerAdminRoutes };
