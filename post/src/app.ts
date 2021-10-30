import "express-async-errors";
import express from "express";

const app = express();
app.use(express.json());

app.use((err: any, req: any, res: any, next: any): any => {
  console.log(err);
  res.status(400).send(err?.message);
});

export { app };
