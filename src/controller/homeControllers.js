import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getListImg = async (req, res) => {
    const { keyword } = req.query;
    const data = await prisma.hinh_anh.findMany({
        where: {
            ten_hinh: {
                contains: keyword,

            },
        },
    });
    return res.status(200).json(data)
}




export {
    getListImg
}