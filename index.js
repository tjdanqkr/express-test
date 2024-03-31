import express from "express";
import authRouter from "./router/auth.js";
import boardRouter from "./router/board.js";
import { setting } from "./utils/util.js";

const app = express();
setting(app);
const port = 4000;

app.use("/api/auth", authRouter);
app.use("/api/boards", boardRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
