import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import cookieParser from "cookie-parser";
import { fileshandler_router } from "./Routes/files_handler_router.router.js";
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", fileshandler_router);
console.log("aaya hu app.js ");
app.get("/", (req, res) => {
  res.send("Hello World");
});
export default app;
