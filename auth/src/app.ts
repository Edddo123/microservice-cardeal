import express from "express";
import { buyerRoutes } from "./buyer/buyer-route";

const app = express();

app.use("/api", buyerRoutes);

export { app };
