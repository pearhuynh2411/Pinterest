import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


const getInfoUser = async (req, res) => {
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const nguoiDungId = decoded.payload.nguoiDungId;
    const data = await prisma.nguoi_dung.findFirst({
        where: {
            nguoi_dung_id: nguoiDungId,
        }
    });

    if (!data) {
        return res.status(404).json({ message: "token no exist" })
    }
    return res.status(200).json(data);
}




const getImgSavedByUserId = async (req, res) => {
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const nguoiDungId = decoded.payload.nguoiDungId;
    let data = await prisma.luu_anh.findFirst({
        where: {
            nguoi_dung_id: nguoiDungId
        },
        include: {
            hinh_anh: true
        }


    })

    if (!data) {
        return res.status(404).json({ message: "No image be saved" })
    }
    return res.status(200).json(data);
}
const getImgCreatedByUserId = async (req, res) => {
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const nguoiDungId = decoded.payload.nguoiDungId;
    const data = await prisma.hinh_anh.findFirst({
        where: {
            nguoi_dung_id: nguoiDungId
        },
        select: {
            ten_hinh: true,
            duong_dan: true
        }
    })
    if (!data) {
        return res.status(404).json({ message: "No image not be create yet" })
    }
    return res.status(200).json(data);
}
const deleteImgByHinhId = async (req, res) => {
    const { hinhId } = req.params;
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const nguoiDungId = decoded.payload.nguoiDungId;
    const checkHinhId = await prisma.hinh_anh.findFirst({
        where: {
            hinh_id: Number(hinhId)
        }
    })
    if (!checkHinhId) {
        return res.status(400).json({ message: "Hinh Id no exist" })
    }



    const data = await prisma.hinh_anh.delete({
        where: {
            hinh_id: Number(hinhId),
            nguoi_dung_id: nguoiDungId
        }

    });

    if (!data) {
        return res.status(404).json({ message: "No image not be create yet" })
    }
    return res.status(200).json({ message: "Deleted successfully" });
}


export {
    getInfoUser,
    getImgSavedByUserId,
    getImgCreatedByUserId,
    deleteImgByHinhId
}