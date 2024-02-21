import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// import routes
import userRouter from './routes/user.routes.js'

// routes declaration ( we are exporting router so we can't use app.get here rather we use app.use here bcz now we will use middleware)
app.use("/api/v1/users", userRouter) // now this call goes to user.routes.js where it is called in /register
//so url become http://localhost:8000/users/register
// for standard practice in market we use api with it's version

export { app }