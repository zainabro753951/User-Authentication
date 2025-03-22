import { users } from "../Models/user.model.js";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import path from "path";
import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads/");
  },
  filename: (req, file, cd) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cd(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match!" });
    }

    // Check if user already exists
    const user = await users.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Generate verification token
    const randomBytes = CryptoJS.lib.WordArray.random(20);
    const verificationToken = randomBytes.toString(CryptoJS.enc.Hex);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await users.create({
      firstname,
      lastname,
      email,
      verificationToken,
      verificationTokenExpiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days expiry
      password: hashedPassword,
    });

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "zainabro886@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const verificationLink = `${process.env.BASE_URL}/sign-up/verify-email/${verificationToken}`;

    const mailOptions = {
      to: newUser.email,
      subject: "Verify Your Email",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">
      Verify Your Email Address
    </h1>
    <p style="color: #666666; font-size: 16px; margin-bottom: 30px;">
      Thank you for signing up! Please click the button below to verify your email address and activate your account.
    </p>
    <a
      href="${verificationLink}"
      style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #ffd43b;
        color: #ffffff;
        font-size: 16px;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;
      "
    >
      Verify Email
    </a>
    <p style="color: #999999; font-size: 14px; margin-top: 30px;">
      If you did not create an account, you can safely ignore this email.
    </p>
  </div>
</div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(201).json({
      message:
        "Account successfully created! Please check your email to verify your account.",
      user: newUser,
    });
  } catch (error) {
    console.error(`Error in creating account: ${error}`);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const registerPendingForm = async (req, res) => {
  try {
    upload.single("profileImg")(req, res, async (error) => {
      if (error) {
        return res
          .status(402)
          .json({ message: "Error during uploading image!" });
      }
      const { id: userId } = req.user;
      const profileImg = req.file;
      const path = profileImg.path;
      const actualPath = path.slice(7);
      console.log(userId);

      const user = await users
        .findByIdAndUpdate({ _id: userId })
        .select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      user.profileImage = actualPath;
      await user.save();

      res.status(201).json({ message: "Profile image uploaded successfully!" });
    });
  } catch (error) {
    console.log(`Error during posting pending form data ${error}`);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
