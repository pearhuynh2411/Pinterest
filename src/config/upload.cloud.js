import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from 'dotenv'

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folders: 'avatar',
        format: async (req, file) => {
            const validFormats = ['jpeg','png', 'gif', 'webp', 'jpg'];
            const fileFormat = file.mimetype.split('/')[1];

            if (validFormats.includes(fileFormat)){
                return fileFormat
            }
            return 'png'
        },
        public_id: (req, file)=> {
            const newName = new Date().getTime() + "_" + file.originalname.split(".")[0];
            return newName;
        }
    }
    
})

export const upload = multer({storage});