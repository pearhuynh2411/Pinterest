import { PrismaClient } from "@prisma/client";
import { upload } from "../config/upload.cloud.js";
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';
const editUser = async (req, res) => {
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const nguoiDungId = decoded.payload.nguoiDungId;
    const {hoTen, tuoi} = req.body;
    const file = req.file;

    const user = await prisma.nguoi_dung.findFirst({
        where: {
            nguoi_dung_id: nguoiDungId
        }
    })
    if (!user) {
        return res.status(404).json({message: "User no exist"});
    }
    let newAvatar = user.anh_dai_dien
    if (file) {
        newAvatar = file.path;
    }

    const updateUser = await prisma.nguoi_dung.update({
        where: {nguoi_dung_id: nguoiDungId},
        data: {
            ho_ten: hoTen,
            tuoi: Number(tuoi),
            anh_dai_dien: newAvatar
        }
    });
    return res.status(200).json({message: "Update successfully",user: updateUser})
}



export {
    editUser,
    upload
}