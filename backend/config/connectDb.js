import mongoose , {mongo} from "mongoose"

const connectDb = async (DATABASE_URI) => {
    try {
        const DB_OPTION  = {
            dbName : "image_database"
        }
        await mongoose.set("strictQuery", false);
        await mongoose.connect(DATABASE_URI,DB_OPTION)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb