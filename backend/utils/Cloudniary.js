const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY,
});


const cloudinaryUploadImg = (fileToUpload) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(fileToUpload, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({                                                                                       
                    url: result.secure_url, // Changed 'res' to 'result.secure_url'
                    asset_id: result.asset_id,
                    public_id: result.public_id,
                }); 
            }
        });
    });
};


const cloudinaryDeleteImg = async (fileToDelete) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(fileToDelete, (result) => {
            resolve(
                {
                    url: result.secure_url,
                    asset_id: result.asset_id,
                    public_id: result.public_id,
                },
                {
                    resource_type: "auto",
                }
            );
        });
    });
};


module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };