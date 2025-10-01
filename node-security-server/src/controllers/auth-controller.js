import * as userValidator from '../validators/user-registration-validation-schema.js';
import * as authService from '../services/auth-service.js';
import * as userService from '../services/user-service.js';
import { ApiError } from '../exceptions/api-error.js';
import passport from 'passport';
import { UserDto } from '../dtos/user-Dto.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt.js';

export const register = async (req, res, next) => {
    try {
        const { error } = userValidator.userRegistrationSchema.validate(req.body);
        if (error) throw new ApiError(400, error.details[0].message);

        const userDto = await authService.register(req.body);
        res.status(201).json(userDto);

    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info?.message || 'Unauthorized' });
        req.login(user, { session: false }, (loginErr) => {

            // Returns the error thrown by the passport.js 
            if (loginErr) return next(loginErr);

            // Generate a short lived access token if user is successfully authenticated
            const accessToken = generateAccessToken(user);

            //Generate a long lived refresh token
            const refreshToken = generateRefreshToken(user);

            // Set the refresh token as a cookie in the response
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // This is to prevent the cookie from being accessed by the client side javascript
                secure: process.env.NODE_ENV === 'production', // This is to ensure that the cookie is only sent over HTTPS in production
                sameSite: 'Strict', // This is to prevent CSRF attacks
                path: '/api/auth', // This is the path that the refresh token will be sent to
                // maxAge: 1000 * 60 * 60 * 24 * 30  this is handled by the JWT itself
            });

            return res.json({ accessToken });
        });
    })(req, res, next);
}

export const refreshToken =async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    try {
        const decoded = verifyToken(token);

        // Find the user to ensure they still exist
        const user = await userService.getUserById(decoded.id);
        if (!user) return res.status(403).json({ message: "User not found" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Strict",
            path: "/api/auth"
        });

        res.json({ accessToken });
    } catch (error) {
        new ApiError(401, error.message);
    }
}