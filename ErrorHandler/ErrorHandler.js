const {ApiError} = require("../Errors/Errors");


const ErrorHandler = (err,req,res,next) => {
 if(err instanceof ApiError) {
  res.status(err.status).json(err.message);
  return;
 }
 res.status(500).json("internal server error");
};

module.exports = {ErrorHandler}