import express from "express";
import { addAImg, upload } from "../controller/addImgControllers.js";
import { tryCatch } from "../config/tryCatch.js";
import { middlewareToken } from "../config/jwt.js";

const addImgRoutes = express.Router();

addImgRoutes.post("/add-a-img", middlewareToken, upload.single('hinhAnh'), tryCatch(addAImg))

export default addImgRoutes