import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";
import eventRouter from "./routes/event.router.js";
import slideRouter from "./routes/slider.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";



const app = express();

const whiteList = [process.env.ORIGIN1];
app.use(
  cors({
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    origin: function (origin, callback) {
      if (whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error de cors origin:" + origin);
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/slides", slideRouter); 
app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on 😎: http://localhost:` + PORT));
