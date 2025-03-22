import { Router } from "express";
import {
  register,
  registerPendingForm,
} from "../Controllers/register.controller.js";
import verify_email from "../Controllers/verify-email.controller.js";
import secureRoute from "../middlewares/SecureRoute.js";
import login from "../Controllers/login.controller.js";
import checkAuth from "../Controllers/CheckAuth.controller.js";
const router = Router();

router.post("/user/register-user", register);
router.post("/user/upload-image", secureRoute, registerPendingForm);
router.post("/user/verify-email", verify_email);
router.post("/user/login", login);

// User Authorization Checking
router.get("/user/check_auth", secureRoute, checkAuth);

export default router;
