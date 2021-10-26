import express from "express";

const router = express.Router();

router.get("/buyer", (req, res) => {
  res.json({ message: "success" });
});

export { router as buyerRoutes };
