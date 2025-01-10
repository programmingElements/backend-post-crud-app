import jwt from "jsonwebtoken";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";

const authentication = asyncHandler(async (req, res, next) => {

  try {
    const token = req.cookies["accessToken"] || req.headers.authorization;
  if (!token) {
    throw new ApiError(401, "Token is missing.");
  }

  const decode = jwt.verify(token, process.env.ACCESS_SECRET_KEY,{
    algorithm: "HS256",
  });

   req.user = {
    id: decode.id,
    email: decode.email
   }

   next();
  } catch (error) {
   next(error); 
  }

});

export { authentication };