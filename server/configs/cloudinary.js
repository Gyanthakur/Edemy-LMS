import {v2 as cloudinary} from 'cloudinary'

const connectCloudinay = async()=>{
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.envCLOUDINARY_SECRET_KEY
    })
}

export default connectCloudinay;