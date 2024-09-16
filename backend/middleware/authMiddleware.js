// const jwt = require("jsonwebtoken");
// const User = require("../model/user.model");


// const authMiddleware = async (req, res, next) => {
//     const token = req.cookies.jwtToken; // Extract token from cookies

//     if (!token) {
//         return res.status(401).json({ error: "No token provided" });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for the secret
        
//         // Find the user based on the decoded token data
//         const user = await User.findById(decoded.userId);
        
//         if (!user) {
//             return res.status(401).json({ error: "User not found" });
//         }

//         // Attach user object to request
//         req.user = user;
        
//         // Proceed to the next middleware or route handler
//         next();
//     } catch (err) {
//         res.status(401).json({ error: "Invalid token" });
//     }
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const authMiddleware = async (req, res, next) => {
    // Extract token from Authorization header or cookies
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies.jwtToken;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by ID
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user; // Attach the user to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;

