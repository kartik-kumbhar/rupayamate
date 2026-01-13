import express from "express";
import { loginUser, registerUser, getCurrent } from "../controllers/userController.js";
import { loginSchema, signupSchema } from "../validation/auth-validator.js";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/users/register", validate(signupSchema), registerUser);
route.post("/users/login", validate(loginSchema), loginUser);
route.get("/users/user", protect, getCurrent);

export default route;



