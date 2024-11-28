import express from "express";
import addImgRoutes from './addImgRoutes.js'
import authRoutes from './authRoutes.js'
import detailRoutes from './detailRoutes.js'
import editUserRoutes from './editUserRoutes.js'
import homeRoutes from './homeRoutes.js'
import managerImgRoutes from './manageImgRoutes.js'

const rootRoutes = express.Router();
rootRoutes.use("/add-img", addImgRoutes)
rootRoutes.use("/auth", authRoutes)
rootRoutes.use("/detail", detailRoutes)
rootRoutes.use("/edit-user", editUserRoutes)
rootRoutes.use("/", homeRoutes)
rootRoutes.use("/manager-img", managerImgRoutes)


export default rootRoutes;