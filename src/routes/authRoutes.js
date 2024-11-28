import express from "express";
import { login, signUp } from "../controller/authControllers.js";
import { tryCatch } from "../config/tryCatch.js";


const authRoutes = express.Router();
authRoutes.post("/sign-up", tryCatch(signUp))
authRoutes.post("/login", tryCatch(login))


export default authRoutes