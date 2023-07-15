import mongoose, { model } from "mongoose";

const meetSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
});



export default model("Meet", meetSchema);
//users