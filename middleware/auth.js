// Required modules and configurations
const jwt = require("jsonwebtoken");
const appRoot = require('app-root-path');
const path = require('path');
const { failureResponse, successResponse } = require(path.join(appRoot.path, '/utils/responseSchema'));
const statusCodes = require(path.join(appRoot.path, '/utils/statusCodes.json'));

/**
 * Middleware function to verify and decode the JSON Web Token (JWT) from the Authorization header.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to call if the token is valid.
 */
const auth = async (req, res, next) => {
    try {
        // Extract the JWT token from the Authorization header
        let token = req.header('Authorization').split(' ')[1];

        // Verify and decode the JWT using the SECRET_KEY from the environment variables
        let user = jwt.verify(token, process.env.SECRET_KEY);

        // Attach the decoded user data to the request object for future use in other middleware or controllers
        req.user = user;

        // Call the next middleware or controller
        next();
    } catch (error) {
        // If the JWT verification fails, send an unauthorized response
        let failure = failureResponse(statusCodes.UNAUTHORIZED.status, "Unauthorized User", statusCodes.UNAUTHORIZED.statusCode)
        res.status(failure.statusCode).send(failure.body)
    }
}

module.exports = auth;
