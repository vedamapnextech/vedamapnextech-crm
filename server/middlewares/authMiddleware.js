const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;


        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No Token Provided.",
            });
        }

        token = token.split(" ")[1];


        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findById(decoded.id).select("-password");


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found",
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
};

module.exports = authMiddleware;