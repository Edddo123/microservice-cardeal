import express from "express";
import "express-async-errors";

import { buyerRoutes } from "./buyer/buyer-route";

const app = express();
app.use(express.json());

app.use("/api", buyerRoutes);

app.use((err: any, req: any, res: any, next: any): any => {
  res.send("Something went wrong");
});

export { app };
