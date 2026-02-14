const express = require('express');
const { registerUser, loginUser, getAllUsers , validateToken} = require('../controllers/AuthController');
const authRouter = express.Router();

authRouter.post("/register/", registerUser );
authRouter.post("/login/" , loginUser);
authRouter.get("/all" , getAllUsers);
authRouter.post("/validate-token" , validateToken);

module.exports = {authRouter};
