import { users } from "../Models/user.model.js";
import jwt from "jsonwebtoken";

const secureRoute = async (req, res, next) => {
  try {
    // Get token from cookies
    const { token } = req.cookies;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login to continue.",
        code: "AUTH_NO_TOKEN",
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (jwtError) {
      if (jwtError.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Your session has expired. Please login again.",
          code: "AUTH_TOKEN_EXPIRED",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
        code: "AUTH_INVALID_TOKEN",
      });
    }

    // Check if decoded token has userId
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format.",
        code: "AUTH_INVALID_TOKEN_FORMAT",
      });
    }

    // Find user
    const user = await users.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please login again.",
        code: "AUTH_USER_NOT_FOUND",
      });
    }

    // Attach user to request object
    req.user = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isVerified: user.isVerified,
      profileImage: user.profileImage,
    };

    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
      code: "AUTH_SERVER_ERROR",
    });
  }
};

export default secureRoute;
