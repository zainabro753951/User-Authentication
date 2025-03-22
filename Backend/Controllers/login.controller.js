import { users } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSaveCookie from "../jwt/generateToken.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateTokenAndSaveCookie(user._id, res);
    res.status(200).json({ message: "Loged in successfully!" });
  } catch (error) {
    console.log(`Error during on login system ${error}`);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export default login;
