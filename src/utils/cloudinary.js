import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from "fs"; // file system
         
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload file on cloudinary 
        const reponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        // file has been uploaded succesfully
        console.log("File has been uploaded on cludinary ", reponse.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // removes the locally saved temporary files as upload file operation failed
        return null;
    }
}

export { uploadOnCloudinary }