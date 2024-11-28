import express from "express";
import { addComment, getCmtImg, getInfoImg, getSaveImg } from "../controller/detailControllers.js";
import { tryCatch } from "../config/tryCatch.js";
import { middlewareToken } from "../config/jwt.js";
const detailRoutes = express.Router();

detailRoutes.get("/get-info-img/:hinhId", middlewareToken, tryCatch(getInfoImg))
detailRoutes.get("/get-cmt-img/:hinhId", middlewareToken, tryCatch(getCmtImg))
detailRoutes.get("/get-save-img/:hinhId", middlewareToken, tryCatch(getSaveImg))
detailRoutes.post("/add-cmt", middlewareToken, tryCatch(addComment))
export default detailRoutes