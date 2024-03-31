import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorhandler from "errorhandler";
import morgan from "morgan";
export const setting = (app) => {
  const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(errorhandler());
  app.use(morgan("dev"));
};
