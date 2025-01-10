import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {MonitorApp} from "./middlewares/app.middlewares.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}))

// common middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use(cookieParser())

// user-defined middleware

app.use(MonitorApp)

// imports
import healthcheckRouter from "./routes/healthcheck.routes.js"
import postRouter from "./routes/post.routes.js"
import { errorHandler } from "./middlewares/error.middlewares.js";
import userRouter from "./routes/user.routes.js";

// routes
app.use("/", healthcheckRouter)
app.use("/api/v1", postRouter)
app.use("/api/v1/users", userRouter);

app.use(errorHandler)

export { app }