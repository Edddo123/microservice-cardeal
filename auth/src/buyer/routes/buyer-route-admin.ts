import express from "express";
import { banBuyer, unbanBuyer } from "../controllers/buyer-admin";
import { isAdminAuth } from "../../middlewares/isAuth";

const router = express.Router();

router.put("/buyer/ban", isAdminAuth, banBuyer);

router.put("/buyer/unban", isAdminAuth, unbanBuyer);


export { router as buyerAdminRoutes };
