import express from "express";
import { editUser, upload } from "../controller/editUserControllers.js";
import { tryCatch } from "../config/tryCatch.js";
import { middlewareToken } from "../config/jwt.js";

const editUserRoutes = express.Router();
editUserRoutes.put("/update-user/", middlewareToken, upload.single('hinhAnh'), tryCatch(editUser))

export default editUserRoutes