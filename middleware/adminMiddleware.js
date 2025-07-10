const jwt = require("jsonwebtoken");
const User = require("../model/userSchema"); // adjust path as needed

module.exports.authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ message: "Unauthorised Token" });

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.KEY);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            } else if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token" });
            }
            throw error; // pass unexpected errors to outer catch
        }

        const user = await User.findById(decoded.id);
        if (!user)
            return res.status(401).json({ message: "User not found" });

        if (!user.isAdmin)
            return res.status(403).json({ message: "Access denied Admin Only" });

        req.user = user;
        next();
    } catch (error) {
        console.log("authenticateAdmin error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
