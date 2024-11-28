import { PrismaClient } from "@prisma/client";
import { upload } from "../config/upload.cloud.js";
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

const addAImg = async (req, res) => {
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const nguoiDungId = decoded.payload.nguoiDungId;
    const file = req.file;
    const { tenHinh, moTa } = req.body;

    const themAnh = await prisma.hinh_anh.create({
        data: {
            ten_hinh: tenHinh,
            duong_dan: file.path,
            mo_ta: moTa,
            nguoi_dung_id: nguoiDungId
        }
    })
    return res.status(201).json({
            message: 'Add image successfully',
            image: themAnh
            
        });
}

export {
    addAImg, upload
}


