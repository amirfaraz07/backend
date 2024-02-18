// require('dotenv').config({path: './env'}) // it can also be done but it disturbs code consistency so we will use import method

import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: './env'
})

connectDB()

















// 1st Approach to connect to DataBase
// import express from "express";
// const app = express()
// ;( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         application.on("error", (error)=> {
//             console.log("Error: ", error);
//             throw error
//         })

//         application.listen( process.env.PORT, () => {
//             console.log(`App is listening on ${process.env.PORT}`);
//         } )
//     } catch (error) {
//         console.error("Error: ", error)
//         throw err
//     }
// } )()