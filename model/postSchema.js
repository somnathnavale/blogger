import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    id:{ type : Number, required : true },
    title:{ type : String, required : true },
    body:{ type : String, required : true },
    dateTime:{ type : String, required : true }
})

const Post=mongoose.model("Post",postSchema);

export default Post;