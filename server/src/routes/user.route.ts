import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerUserSchema, loginUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchema), loginUser);

export default router;
