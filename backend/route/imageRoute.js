import express from "express"
import imageController from "../controller/imageController.js"
import { upload } from "../utils/fileUpload.js"

const router = express.Router()

router.post("/",upload.single("image"),imageController.uploadImage)
router.get("/",imageController.getImage)

export default router