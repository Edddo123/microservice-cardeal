import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { buyerRoutes } from "./buyer/buyer-route";

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use("/api", buyerRoutes);

app.use((err: any, req: any, res: any, next: any): any => {
  console.log(err);
  res.send("Something went wrong");
});

export { app };
