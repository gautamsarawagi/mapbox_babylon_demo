import mongoose, { mongo } from "mongoose";

const imageSchema = mongoose.Schema({
    image:{type:Object,default:{}}
},{
    timeStamps:true
})

const imageModel = mongoose.model("images",imageSchema)

export default imageModel