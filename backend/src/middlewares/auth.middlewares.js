import {expressjwt} from "express-jwt";
import jwksRsa from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config();

// Middleware to validate JWT from Auth0
// export const verifyAuth0Token = expressjwt({
//     secret: jwksRsa.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
//     }),
//     audience: process.env.AUTH0_AUDIENCE,
//     issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//     algorithms: ["RS256"],
// });



export const verifyAuth0Token= (req, res, next) => {
  console.log("Skipping authentication...");
  next();  // Allows all requests through
};

// Middleware to check if the user has the required role
export const checkRole = (role) => {
    return (req, res, next) => {
        const userRole = req.auth["https://your-api.com/role"]; // Get role from Auth0 token
        if (userRole !== role) {
            return res.status(403).json({ error: "Access denied" });
        }
        next();
    };
};
