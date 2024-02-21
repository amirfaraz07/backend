import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([ // this will act as a middleware to take images from user
        {
            name: "avatar", // take image with this name
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1 // take 1 file only
        }
    ]),
    registerUser
    )
// here /users/register then post will take us to registerUser which is in user.controller.js

export default router