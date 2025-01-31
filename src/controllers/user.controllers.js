import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js";

const generateToken = async (userId) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user.generateAccessToken();

}

const registerUser = asyncHandler(async (req, res, next) => {
  // collect the data ---> { username, email, fullname, password }
  // validate the data
  // check the user existaince
  // save the content

  const {username, email, fullname, password} = req.body;

  if ([username, email, fullname, password].some((ele) => ele.trim() === "")) {
    throw new ApiError(400, "All Fields are required.");
  }

  const user = await User.findOne({$or:[{username}, {email}]});

  if (user) {
    throw new ApiError(400, "User Already Existed.");
  }

  const newUser = await User.create({
    username,
    email,
    fullname,
    password
  });

  const userCreated = await User.findById(newUser._id).select("-password -__v");

  if (!userCreated) {
    throw new ApiError(400, "User Creation Failed!");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      userCreated,
      "User Created Successfully!"
    )
  )

});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const {email, password} = req.body;

    if ([email, password].some((ele) => ele.trim() === "")) {
      throw new ApiError(400, "All fields are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    const isPasswordCorrect = user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid Credentials.");
    }

    const loggedInUser = await User.findById(user._id).select("-password -__v");

    if (!loggedInUser) {
      throw new ApiError(400, "User not found.");
    }

    const token = await generateToken(loggedInUser._id);
    
    const options = {
      httpsOnly: true,
      secure: true
    }

    return res.status(200).cookie("accessToken", token, options).json(
      new ApiResponse(200, loggedInUser, "User LoggedIn Successfully!")
    );

  } catch (error) {
    throw new ApiError(error?.status || error?.statusCode || 500, error?.message || "Something went wrong!");
  }
});

const getUserInfo = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User doesn't exists!");
    }

    const getUserInfo = await User.findById(user._id).select("-password -__v");

    return res.status(200).json(
      new ApiResponse(200, getUserInfo, "Got user info successfully!")
    );

  } catch (error) {
    throw new ApiError(error?.status || error?.statusCode || 500, error?.message || "Something went wrong!");
  }
});

const changeUserPassword = asyncHandler( async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User doesn't exists!");
    }

    const {oldPassword, newPassword} = req.body;

    const isPassCorrect = user.comparePassword(oldPassword);

    if (!isPassCorrect) {
      throw new ApiError(400, "Invalid Credentials!");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    const updatedUser = await User.findById(user._id);

    if (!updatedUser) {
      throw new ApiError(404, "User doesn't exists!");
    }

    return res.status(200).json(
      new ApiResponse(200, updatedUser, "Password Updated Successfully!")
    );

  } catch (error) {
    throw new ApiError(error?.status || error?.statusCode || 500, error?.message || "Something went wrong!");
  }
});

const logoutUser = asyncHandler( async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      throw new ApiError(400, "Missing the userId.");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User doesn't exists.");
    }

    const options = {
      httpsOnly: true,
      secure: true
    }

    res.clearCookie("accessToken", options);

    return res.status(200).json(
      new ApiResponse(200, {}, "User loggedOut successfully!")
    );

  } catch (error) {
    throw new ApiError(error?.status || error?.statusCode || 500, error?.message || "Something went wrong!");
  }
});

export {registerUser, loginUser, getUserInfo, changeUserPassword, logoutUser};