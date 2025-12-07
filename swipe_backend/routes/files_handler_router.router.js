import { Router } from "express";
import { fileshandler_controller } from "../Controller/fileshandler_controller.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const fileshandler_router = Router();

fileshandler_router
  .route("/files_analysis")
  .post(upload.array("files"), fileshandler_controller);
// files shud be from frontend name matters

export { fileshandler_router };
