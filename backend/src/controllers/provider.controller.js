import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Provider } from "../models/provider.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefereshTokens = async (providerId) => {
  try {
    const provider = await Provider.findById(providerId);
    const accessToken = provider.generateAccessToken();

    return accessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

const registerProvider = asyncHandler(async (req, res) => {
  const { email, phoneNumber, category, address } = req.body;

  if (!email || !phoneNumber || !category || !address) {
    throw new ApiError(400, "All fields are required");
  }

  const existedProvider = await Provider.findOne({ phoneNumber });
  if (existedProvider) {
    throw new ApiError(409, "Provider with this phoneNumber already exists");
  }
  const existedProviderEmail = await Provider.findOne({ email });
  if (existedProviderEmail) {
    throw new ApiError(409, "Provider with this email already exists");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  const provider = await Provider.create({
    providername: user.username,
    email: user.email,
    phoneNumber,
    category,
    avatar: user.avatar,
    address,
  });

  const createdProvider = await Provider.findById(provider._id)

if (!createdProvider) {
    throw new ApiError(500, "Something went wrong while registering the provider")
}
const accessToken = await generateAccessAndRefereshTokens(createdProvider._id);

const options = {
  httpOnly: true,
  secure: true,
};

return res.status(201).cookie("accessToken", accessToken, options).json(
    new ApiResponse(200, {createdProvider, accessToken}, "Provider registered Successfully")
)
});

const getCurrentProvider = asyncHandler(async (req, res) => {
  const providerId = req.provider._id;

  const provider = await Provider.findById(providerId).select(
    "-password"
  );

  if (!provider) {
    throw new ApiError(404, "Provider not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, provider, "Provider fetched successfully"));
});

const updateServiceRatingAndReview = asyncHandler(async (req, res) => {
  const { user, rating, comment, providerId } = req.body;

  const provider = await Provider.findById(providerId);

  const review = {
    user, 
    rating, 
    comment, 
    providerId
  }

  const existingReviewIndex = provider.reviews.findIndex(rev => rev.user._id === req.user._id);

  if (existingReviewIndex !== -1) {
    // Update existing review
    provider.reviews[existingReviewIndex] = review;
  } else {
    // Add new review
    provider.reviews.push(review);
  }

  // Update average rating
  const totalRatings = provider.reviews.reduce((total, rev) => total + rev.rating, 0);
  provider.ratings = totalRatings / provider.reviews.length;

  await provider.save();

  res.status(200).json(new ApiResponse(200, review, "review added successfully"));
  
});

const getAllServiceProviders = asyncHandler(async (req, res) => {
  const providers = await Provider.find();

  if (!providers || providers.length === 0) {
    throw new ApiError(404, "No service providers found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, providers, "List of service providers"));
});

export {
  registerProvider,
  getCurrentProvider,
  updateServiceRatingAndReview,
  getAllServiceProviders,
};
