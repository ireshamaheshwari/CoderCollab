const createHttpError = require("http-errors");
const { userModel } = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const {SECRET_KEY , decodeJWT} = require("../utils/Encryption");

const registerUser = async (user) => {
  try {
    if (!user.name || !user.email || !user.password) createHttpError(400, "provide credentials");
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new userModel(user);
    console.log(newUser);
    const savedUser = await newUser.save();
    console.log("user registered : " ,savedUser);
    return {
        userId : savedUser._id,
        name : savedUser.name,
        email : savedUser.email
    };
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async(user) => {
    console.log(user)
    if(!user.email || !user.password) createHttpError(400 , "Provide Credentials")
    try {
        // console.log(user.email + ' '+ user.password);
        const findUser =  await userModel.findOne({ email: user.email });
        if(!findUser) throw createHttpError( 500 ,'User not found');
        const isValidPassword = await bcrypt.compare(user.password, findUser.password);
        if(!isValidPassword )throw createHttpError(500 , 'Invalid Password');
        return {
            userId : findUser._id,
            name : findUser.name,
            email : findUser.email
        };
    } catch (error) {
        console.log(error);
    }
};

const getAllUsers = async() => {
    try {
        const allUsers = await userModel.find().exec();
        if(!allUsers) createHttpError(404 , "No users Found!");
        const allUsersResponse  = allUsers.map((user)=> ({
            id : user.id,
            name : user.name,
            email : user.email
         }) );
        return allUsersResponse;
    } catch (error) {
        console.log('Error in getting Users', error);
    }
};

const generateToken = (user) => {
    try {
        const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { algorithm: "HS256", expiresIn: '10000h' });
        return token;
    } catch (err) {
        console.log(err);
    }
}

const validateToken = async(token , role) => {
    const decoded = decodeJWT(token , SECRET_KEY).payload;
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) return {isValid : false , message : "Token expired !!"}
    if(role !== "admin") return {isValid : false , message : "Unauthorized  access !! Only admin can perform this action"};
    // console.log(`token in validate token () : ${decoded.userId} `)
    const userId = decoded.userId;
    try {
        // console.log(`user id : ${userId}`);
        const findUser =  await userModel.findOne({ _id : userId });
        // console.log(`user found is : ${findUser}`)
        if(!findUser) return { isValid:false ,message:"Invalid token"};
        else return { isValid : true , message : "valid token"};
    } catch (error) {
        console.log(error);
        return {isValid : false , message : "Invalid token"};
    }
}

module.exports = { registerUser, loginUser, getAllUsers , generateToken , validateToken };
