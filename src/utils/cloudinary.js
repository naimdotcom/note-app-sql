const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(file, {
      transformation: [
        {
          quality: 35,
        },
        {
          fetch_format: "auto",
        },
      ],
    });
    console.log(uploadResult.url);

    return uploadResult.url;
  } catch (error) {
    console.log("error from cloudinary upload image:" + error);
  }
};

module.exports = { uploadOnCloudinary };
