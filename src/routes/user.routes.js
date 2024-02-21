import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser) // here /users/register then post will take us to registerUser which is in user.controller.js

export default router