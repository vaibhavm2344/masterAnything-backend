import jwt from 'jsonwebtoken';
// import 'dotenv/config';

export const generateAcessToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

export const generateRefreshToken = (sessionId) => {
    return jwt.sign(
        {
            sessionId
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

export const verifyAccessToken = (token) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);