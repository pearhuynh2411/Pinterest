import express from "express";
import { getListImg } from "../controller/homeControllers.js";
import { tryCatch } from "../config/tryCatch.js";
import { middlewareToken } from "../config/jwt.js";

const homeRoutes = express.Router();
homeRoutes.get("/get-list-img", middlewareToken, tryCatch(getListImg))

export default homeRoutes