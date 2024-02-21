import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiRespose } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty any input from user
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar // in return it will give us url now we have to check whether it is available on cloudinary then it come back to us so we have to create a user object
    // now create user object - create entry in db
    // remove password and refresh token field from response
    // chk for user creation then
    // return registered

    const { fullName, email, username, password } = req.body // it can be used to handle any data but not file handling for file handling we will go to multer which we declared in utils and use that in user.routes.js as a middleware
    console.log("email: ", email);

    // if ( fullName == "" ) {
    //     throw new ApiError(400, "Full Name is required")
    // }  // chking like this require code for each term rather we have an alternative for that
    if( 
        [fullName, username, email, password].some(
            (field) => field?.trim() === ""
            ) ) {
                throw new ApiError(400, "All fields are required")
            }

    const existedUser = User.findOne({
        $or: [{ username }, { email }] // we can use "or" using $ sign here
    })

    if (existedUser) {
        throw new ApiError( 409, "User already exist with this email or number")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path // files is a name for multiple files bcz we using multer it give acces to files and avatar bcz we named it as it is in models...it has many objects but we take [0] i.e. 1st object as a path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select( // using select we write those which we don't need to show
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiRespose( 200, createdUser, "User registered Successfully" )
    )

} )

export { registerUser }