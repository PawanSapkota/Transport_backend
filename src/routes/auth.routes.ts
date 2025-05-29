import { Router } from "express";
import { validateLogin, validateRegister } from "../middlewares/auth.middleware";
import { login, registerUser } from "../controller/auth.controller";
const router = Router()

router.post("/register",validateRegister, registerUser);
router.post("/login",validateLogin,login);

export default router;