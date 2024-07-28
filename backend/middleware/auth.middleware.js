import jwt from "jsonwebtoken";

export const authMiddleware = ( req, res, next ) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(400).json({
            status: "Failed",
            message: "Access denied!"
        });
    };

    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifyToken;
        next();
    } catch (error) {
        return res.status(400).json({
            status: "Failed",
            message: "Invalid token!"
        });
    };
};