import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import {Provider} from "../models/provider.model.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    let token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // If the token starts with "Bearer ", remove it
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    // Check for specific errors
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid access token");
    } else if (error.name === "TokenExpiredError") {
      throw new ApiError(403, "Access token expired");
    } else {
      throw new ApiError(401, error.message || "Invalid access token");
    }
  }
});

export const verifyJWTProvider = asyncHandler(async (req, res, next) => {
  try {
    let token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request 2");
    }

    // If the token starts with "Bearer ", remove it
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const provider = await Provider.findById(decodedToken._id);

    if (!provider) {
      throw new ApiError(401, "Invalid Access Token 2");
    }

    req.provider = provider;
    next();
  } catch (error) {
    // Check for specific errors
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid access token 2");
    } else if (error.name === "TokenExpiredError 2") {
      throw new ApiError(403, "Access token expired 2");
    } else {
      throw new ApiError(401, error.message || "Invalid access token 2");
    }
  }
});