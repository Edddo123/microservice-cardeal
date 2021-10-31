import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { buyerRoutes } from "./buyer/routes/buyer-route";
import { buyerAdminRoutes } from "./buyer/routes/buyer-route-admin";

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use("/api/user", buyerRoutes);
app.use("/admin/user", buyerAdminRoutes);

app.get("*", (req, res) => {
  res.json({ message: "success" });
});

app.use((err: any, req: any, res: any, next: any): any => {
  console.log(err);
  res.status(400).send(err?.message);
});

export { app };
