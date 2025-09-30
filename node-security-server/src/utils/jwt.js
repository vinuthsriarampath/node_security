import jwt from 'jsonwebtoken';


export const generateAccessToken = (user) => {
    return jwt.sign(
        {id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}