import "express-async-errors";
import express from "express";
import { buyerPostRoutes } from "./buyer-post/routes/buyer-post-route";
import cookieSession from "cookie-session";

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use("/api", buyerPostRoutes);

app.use((err: any, req: any, res: any, next: any): any => {
  console.log(err);
  res.status(400).send(err?.message);
});

export { app };
