import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
});

const providerSchema = new mongoose.Schema(
  {
    providername: {
      type: String,
      ref: "User",
    },
    email: {
      type: String,
      ref: "User",
    },
    address: [addressSchema],
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Please enter your service category!"],
    },
    role: {
      type: String,
      default: "Provider",
    },
    avatar: {
      type: String,
      ref: "User",
    },
    reviews: [
      {
        user: {
          type: Object,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
        providerId: {
          type: String,
        },
      },
    ],
    ratings: {
      type: Number,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

providerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const Provider = mongoose.model("Provider", providerSchema);
