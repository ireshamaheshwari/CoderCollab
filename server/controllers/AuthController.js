const createHttpError = require("http-errors");
const AuthService = require("../service/AuthService");

const loginUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email) createHttpError(400, "Email is required");
        if (!password) createHttpError(400, "Password is required");
        const user = await AuthService.loginUser(req.body);
        if (!user) throw createHttpError(401, "Invalid credentials");
        const accessToken = await AuthService.generateToken(user);
        if (!accessToken) throw createHttpError(401, `Invalid credentials`);
        console.log("login User", {
            message: "user login success!!",
            user,
            accessToken,
        });
        res.status(200).send({
            message: "user login success!!",
            user,
            accessToken,
        });
    } catch (e) {
        next(e);
    } finally {
        next();
    }
};

const registerUser = async (req, res, next) => {
    // console.log(req);
    // console.log(res);

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try {
        if (!name) createHttpError(400, "Name is required");
        if (!email) createHttpError(400, "Email is required");
        if (!password) createHttpError(400, "Password is required");
        const user = await AuthService.registerUser(req.body);
        if (!user) throw createHttpError(400, "Server Error");
        const accessToken = await AuthService.generateToken(user);
        console.log(accessToken);
        res.status(200).send({
            message: "user registered!!",
            user,
            accessToken,
        });
    } catch (e) {
        console.log(e);
        next(e);
    } finally {
        next();
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await AuthService.getAllUsers();
        res.status(200).send(allUsers);
    } catch (error) {
        console.log("Error in getting users : ", error);
    }
};

const validateToken = async(req, res, next) => {
    try {
        // console.log("validate token : ", req);
        const token = req.body.accessToken;
        console.log("to validate : ", token);
        const role = req.body.userRole;
        const result = await AuthService.validateToken(token, role);
        if(!result) return next(createHttpError(401, 'Invalid Token'));
        
        // store user details on request object to use it in other middlewares
        res.status(200).send({...result});
    } catch(err) {
        console.log(err);
        next(err);
    }
};

module.exports = { loginUser, registerUser, getAllUsers, validateToken };
