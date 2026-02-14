const { decodeJWT } = require("./Encryption");

const validateJWTToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw "No Token Found!!";
        // Verify the JWT Token
        const decoded = decodeJWT(token);
        const decodedUser = decoded.payload.userId;
        if (!decodedUser) throw "Token Invalid!!";
        console.log(decodedUser , req.body.userId)
        if (String(decodedUser) === String(req.body.userId)) return next();
        else throw "You are not Authorized to Access this Resource.";
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports = { validateJWTToken };
