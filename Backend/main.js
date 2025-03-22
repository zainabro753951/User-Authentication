import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import users from "./Routes/user.route.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connection database mongobd
const url = process.env.MONGODB_URL;
try {
  await mongoose.connect(url);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1);
}

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  })
);

const port = process.env.PORT || 4000;

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/upload")));

// all Routes
app.use(users);

app.listen(port, () => console.log("Server listing on this port " + port));
