import mongoose, { now } from "mongoose";

const contactModel = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        message:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true
    }
)

const Contact = mongoose.model("Contact",contactModel);
export default Contact;