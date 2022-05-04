import Post from "../model/postSchema.js";

export const getAllPosts=async(req,res)=>{
    try{
        const response=await Post.find({});
        console.log(response);
        res.status(200).json(response);
    }catch(err){
        console.log(err);

    }
}

export const getPost=async(req,res)=>{
    try{
        const post=await Post.findOne({id:Number(req.params.id)})
        res.status(200).json(post);
    }catch(err){
        console.log(err.message);
        res.status(404).json({message:err.message})
    }
}

export const addPost=async(req,res)=>{
    const post=req.body;
    const newPost=new Post(post);
    try{
        const response=await newPost.save();
        res.status(201).json(newPost);
    }catch(err){
        console.log(err.message);
        res.status(409).json({message:err.message})
    }
}

export const updatePost=async(req,res)=>{
    const post=req.body;
    const newPost=new Post(post);
    try{
        await Post.updateOne({id:req.params.id},post);
        res.status(201).json(newPost);
    }catch(err){
        console.log(err.message);
        res.status(409).json({message:err.message})
    }
}

export const deletePost=async(req,res)=>{
    try{
        await Post.deleteOne({id:Number(req.params.id)});
        res.send(req.params.id);
    }catch(err){
        console.log(err.message);
        res.status(404).json({message:err.message})
    }
}