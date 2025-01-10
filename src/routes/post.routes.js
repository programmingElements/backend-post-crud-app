import { Router } from "express";
import { createPost, updatePost, deletePost, getAllPost, getPost} from "../controllers/post.controllers.js";

const router = Router();

router.route('/posts').post(createPost);

router.route('/posts/:id').put(updatePost);

router.route('/posts/:id').delete(deletePost);

router.route('/posts').get(getAllPost);

router.route('/posts/:id').get(getPost);

export default router;