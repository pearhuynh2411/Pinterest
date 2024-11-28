import express from "express";
import { deleteImgByHinhId, getImgCreatedByUserId, getImgSavedByUserId, getInfoUser } from "../controller/manageImgControllers.js";
import { tryCatch } from "../config/tryCatch.js";
import { middlewareToken } from "../config/jwt.js";


const managerImgRoutes = express.Router();

managerImgRoutes.get("/get-info-user", middlewareToken, tryCatch(getInfoUser))
managerImgRoutes.get("/get-img-saved-by-user-id/", middlewareToken, tryCatch(getImgSavedByUserId))
managerImgRoutes.get("/get-img-created-by-user-id/", middlewareToken, tryCatch(getImgCreatedByUserId))
managerImgRoutes.delete("/delete-img-by-img-id/:hinhId",middlewareToken, tryCatch(deleteImgByHinhId) )
export default managerImgRoutes