import { use } from "react";
import ApiError from "../configuration/ApiError";

const createUser =  async (userData, file) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
  } = userData;

  if (!file) {
    throw new ApiError(400, "Profile image is required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    role,
    password: hashedPassword,
    profileImage: file.path,
  });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
  };
};

export const loginUser = async (userData) => {
    if (!userData.username) {
        throw new ApiError(400,"Username is required")
    }
    if (!userData.password) {
        throw new ApiError(400,"Password is required")
    }
    
    const user = await User.findOne({ email: username });
    if (!user)
        throw new ApiError(400,"User not found")
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
        throw new ApiError(400,"Invalid password")
    
    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    return {user,refreshToken,accessToken}
            
}
export default{
createUser,loginUser
}