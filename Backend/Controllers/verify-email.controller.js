import generateTokenAndSaveCookie from "../jwt/generateToken.js";
import { users } from "../Models/user.model.js";
const verify_email = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);

    if (!token) {
      return res.status(400).json({ message: "Token not found!" });
    }

    const verify = await users.findOne({ verificationToken: token });
    if (!verify) {
      return res.status(400).json({ message: "Invalid token!" });
    }

    verify.isVerified = true;
    verify.verificationToken = null;
    verify.verificationTokenExpiryDate = null;
    await verify.save();

    const jwtToken = await generateTokenAndSaveCookie(verify._id, res);
    console.log(jwtToken);

    res.status(200).json({ message: "Your email is verified!" });
  } catch (error) {
    console.log(`Error on verifing email : ${error}`);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export default verify_email;
