import { Router } from "express";
import { loginUser, registerUser, getUserInfo, changeUserPassword } from "../controllers/user.controllers.js";
import { signinSchema, signupSchema } from "../validators/user.validators.js";
import { validate } from "../middlewares/validate.middlewares.js";
import { authentication } from "../middlewares/authentication.middlewares.js";

const router = Router();

router.route("/signup").post(validate(signupSchema), registerUser);

router.route("/login").post(validate(signinSchema), loginUser);

router.route("/profile").get(authentication, getUserInfo);

router.route("/change-password").put(authentication, changeUserPassword);

export default router;