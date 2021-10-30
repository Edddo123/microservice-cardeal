import express from "express";
import { createBuyerPost, getBuyerPosts, deleteBuyerPost } from "../controllers/buyer-post-controller";
import { isAuth } from "../../middlewares/isAuth";

const router = express.Router();

router.get("/post/buyer", isAuth, getBuyerPosts);

router.post("/post/buyer", isAuth, createBuyerPost);

router.delete("/post/buyer/:postId", isAuth, deleteBuyerPost);



export { router as buyerPostRoutes };
