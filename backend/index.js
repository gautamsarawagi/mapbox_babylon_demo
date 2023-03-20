import express from "express"
import connectDb from "./config/connectDb.js"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import path from "path"
import image from "./route/imageRoute.js"
import errorHandler from "./middleWares/errorMiddleWare.js"

dotenv.config()

const app = express()
app.use(cors());

const port = process.env.PORT || 8000
const DATABASE_URL = process.env.DATABASE_URI

// database connection
connectDb(DATABASE_URL)

// controllers
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/uploads", express.static(path.join(path.dirname(import.meta.url), "uploads")));

// paths

app.use("/api/", image);

// errorHandler
app.use(errorHandler)

app.listen(port, () => [
  console.log(`App running on port ${port}`)
])