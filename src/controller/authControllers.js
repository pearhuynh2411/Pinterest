import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { createToken } from '../config/jwt.js';


const prisma = new PrismaClient();

const signUp = async (req, res) => {
    let { email, mat_khau, ho_ten, tuoi } = req.body
    let checkUser = await prisma.nguoi_dung.findFirst({
        where: {
            email
        }
    })
    if (checkUser) {
        return res.status(400).json({ message: "Email already exists" })
    }

    await prisma.nguoi_dung.create({
        data: {
            email,
            mat_khau: bcrypt.hashSync(mat_khau, 10),
            ho_ten,
            tuoi: Number(tuoi)
        }
    })
    return res.status(201).json({ message: "Create User successfully" });

}
const login = async (req, res) => {
    const { email, mat_khau } = req.body;

    const checkUser = await prisma.nguoi_dung.findFirst(({
        where: { email }
    }));
    if (!checkUser) {
        return res.status(400).json({ message: "Email not exists, Please sign up" })
    }
    let checkPass = bcrypt.compareSync(mat_khau, checkUser.mat_khau);
    if (!checkPass) {
        return res.status(400).json({ message: "Password is wrong" });
    }
    let payload = {
        nguoiDungId: checkUser.nguoi_dung_id
    }
    let accessToken = createToken(payload)

    return res.status(200).json({ message: "Login successfully", token: accessToken })



}
export {
    signUp, login
}