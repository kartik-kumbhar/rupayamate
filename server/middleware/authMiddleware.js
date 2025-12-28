import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    try {
        let token;

        // Check if token exists in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            // Extract token
            token = req.headers.authorization.split(" ")[1];

            // Verify token using your secret key
            const isVerify = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user info (excluding password) to request
            const userData = await User.findById(isVerify.id).select("-password");
            req.user = userData;
            req.token = token;
            req.userId = userData._id

            // Proceed to next middleware/controller
            next();
        }

        // If no token found
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }
    } catch (error) {
        // console.error("Auth error:", error);
        res.status(401).json({ message: "Token failed or expired" });
    }
};