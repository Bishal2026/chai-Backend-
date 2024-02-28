import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APiErrror.js";

import { User } from "../models/user.models.js";

import { uploadOnCloudinary } from "../utils/cloudnariry.js";

import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //data fom body
  const { username, fullname, email, password } = req.body;

  // all data is field or not

  if (
    [useranme, fullname, email, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "fullname required");
  }

  //user exits or not
  const existUser = User.findOne({
    $or: [{ useranme }, { email }],
  });
  if (existUser) {
    throw new ApiError(400, "User is allready exits");
  }

  //file is upload
  const avatarLocalpath = req.files?.avatar[0]?.path;
  const coverImageLoaclPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalpath) {
    throw new ApiError(400, "avatar file is reqied");
  }

  const avatar = await uploadOnCloudinary(avatarLocalpath);

  const coverImage = await uploadOnCloudinary(coverImageLoaclPath);

  if (!avatar) {
    throw new ApiError(400, "avatar file is reqied");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const creatUser = await User.findById(user._id).select(
    "-pasword -refreshToken"
  );
  if (!creatUser) {
    throw new ApiError(500, "something went to be worng");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, creatUser, "user register Successfully"));
});

export { registerUser };
