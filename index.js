import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorhandler from "errorhandler";
import morgan from "morgan";
const app = express();
const port = 3000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
const setting = (app) => {
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(errorhandler());
  app.use(morgan("dev"));
};
setting(app);
const data = [];

app.get("/board", (req, res) => {
  res.send(data);
});

app.post("/board", (req, res) => {
  req.body.id = data.length + 1;
  data.push(req.body);
  res.status(201).send();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
