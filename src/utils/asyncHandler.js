import React from 'react'

const asyncHandler = ( requestHandler ) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }
}

export default asyncHandler





//lets convert this code in promises above
// const asyncHandler = (fn) => async (req, re, next) => {
// try {
//         await fn( req, re, next )
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// } 