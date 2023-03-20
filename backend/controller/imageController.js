import imageModel from "../model/imageModel.js";
import { fileSizeFormatter } from "../utils/fileUpload.js";
import cloudinary from "../utils/cloudinary.js";

class imageController {
  static uploadImage = async (req, res, next) => {
    try {

      let fileData = {};

      if (req.file) {
        let uploadFile;
        try {
          uploadFile = await cloudinary.uploader.upload(req.file.path, {
            folder: "screenshots",
            resource_type: "image",
          });
        } catch (error) {
          res.status(400);
          throw new Error("Image cannot be uploaded");
        }

        fileData = {
          fileName: req.file.originalname,
          filepath: uploadFile.secure_url,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2),
        };
      }

      console.log(fileData);

      const product = await imageModel.create({
        image: fileData,
      });

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  static getImage = async (req,res,next) => {
    try {

      const image = await imageModel.findOne().sort({$natural :-1})

      res.status(200).json(image)

    } catch (error) {
      next(error)
    }
  }

}

export default imageController;