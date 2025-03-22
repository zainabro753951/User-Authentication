import jwt from "jsonwebtoken";

const generateTokenAndSaveCookie = (userId, res) => {
  try {
    console.log(userId);

    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 3600000, // 1 hour
    });
    return token;
  } catch (error) {
    console.error(`Error during generating token ${error}`);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export default generateTokenAndSaveCookie;
