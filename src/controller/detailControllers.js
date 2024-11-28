import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

const getInfoImg = async (req, res) => {
    const { hinhId } = req.params

    const data = await prisma.hinh_anh.findFirst({
        where: {
            hinh_id: Number(hinhId)
        },

        include: {
            nguoi_dung: {
                select: {
                    ho_ten: true,
                    anh_dai_dien: true
                }
            }

        },
    })
    return res.status(200).json(data);
}
const getCmtImg = async (req, res) => {
    const { hinhId } = req.params

    const data = await prisma.binh_luan.findMany({
        where: {
            hinh_id: Number(hinhId)
        }
    })
    return res.status(200).json(data);
}

const getSaveImg = async (req, res) => {
    const { hinhId } = req.params
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const nguoiDungId = decoded.payload.nguoiDungId;

    const checkImg = await prisma.hinh_anh.findFirst({
        where: {
            hinh_id: Number(hinhId)
        }
    })
    if (!checkImg) {
        return res.status(404).json({ message: "Image no exist" })
    }

    const checkSave = await prisma.luu_anh.findFirst({
        where: {
            hinh_id: Number(hinhId),
            nguoi_dung_id: nguoiDungId
        }
    })
    
    if (checkSave) {
        return res.status(200).json({ message: "Đã lưu" })
    } else {
        return res.status(200).json({ message: "Lưu" })
    }

}

const addComment = async (req, res) => {
    const { nguoiDungId, hinhId, ngayBinhLuan, noiDung } = req.body;
    await prisma.binh_luan.create({
        data: {
            nguoi_dung_id: Number(nguoiDungId),
            hinh_id: Number(hinhId),
            ngay_binh_luan: ngayBinhLuan,
            noi_dung: noiDung
        }
    })
    return res.status(201).json({ message: "Add comment successfully" })
}

export {
    getInfoImg,
    getCmtImg,
    getSaveImg,
    addComment
}