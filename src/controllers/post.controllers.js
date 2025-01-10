import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { Post } from "../models/post.models.js"

const createPost = asyncHandler(async (req, res) => {
  const {title, body} = req.body;

  // check the post already exists using title
  const post = await Post.findOne({ title });

  if (post) {
    throw new ApiError(401, "Post Already Existed.");    
  }

  const newPost = await Post.create({
    title,
    body
  });

  const createdPost = await Post.findById(newPost._id);

  if (!createdPost) {
    throw new ApiError(400, "Post Creation Failed.")
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      createdPost,
      "Post Created Successfully!"
    )
  )
})

const updatePost = asyncHandler(async (req, res) => {
  const {title, body} = req.body;
  const {id} = req.params;

  // check post is already exists or not
  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  const updatedPost = await Post.findByIdAndUpdate(id, {
    $set: {
      title,
      body
    }
  }, { new: true });

  if (!updatedPost) {
    throw new ApiError(400, "Post Updation Failed.");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedPost, "Post Updated Successfully!")
  )

})

const deletePost = asyncHandler(async (req, res) => {
  const {id} = req.params;

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    throw new ApiError(400, "Post Deletion Failed.");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "Post Deleted Successfully!")
  )
})

const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find(); // [{},{}]

  if (posts.length === 0) {
    throw new ApiError(404, "Posts not found.");
  }

  return res.status(200).json(
    new ApiResponse(200, posts, "Got All Posts!")
  )
})

const getPost = asyncHandler(async (req, res) => {
  const {id} = req.params;

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found.")
  }

  return res.status(200).json(
    new ApiResponse(200, post, "Got Single Post")
  )
})


export { createPost, updatePost, deletePost, getAllPost, getPost }