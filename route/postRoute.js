import express from 'express';
import { addPost, deletePost, getAllPosts, getPost, updatePost } from '../controller/postController.js';
const router=express.Router();

router.route('/posts').get(getAllPosts).post(addPost);

router.route('/posts/:id').get(getPost).put(updatePost).delete(deletePost);

export default router;