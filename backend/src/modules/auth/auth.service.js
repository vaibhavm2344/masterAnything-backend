import User from '../../models/User.model.js';
import Session from '../../models/Session.model.js';
import { hashPassword, comparePassword } from '../../utils/hash.js';
import { generateAcessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';

export const registerUser = async({name, email, password, userAgent, ip}) => {
    const existingUser = await User.findOne({email});
    if(existingUser) {
        throw new Error("User with this email already exists");
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
        name,
        email,
        passwordHash,
    });

    const session = await Session.create({
        userId: user._id,
        refreshTokenHash: 'temp', // will be updated later
        userAgent,
        ipAddress: ip,
        expiresAt: new Date(Date.now() + 7*24*60*60*1000), // 7 days
    });

    const accessToken = generateAcessToken(user);
    const refreshToken = generateRefreshToken(session._id);

    session.refreshTokenHash = await hashPassword(refreshToken);
    await session.save();

    return { user, accessToken, refreshToken };
};

export const loginUser = async({email, password, userAgent, ip}) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if(!isMatch) {
        throw new Error("Invalid email or password");
    }

    const session = await Session.create({
        userId: user._id,
        refreshTokenHash: 'temp',
        userAgent,
        ipAddress: ip,
        expiresAt: new Date(Date.now() + 7*24*60*60*1000),
    });

    const accessToken = generateAcessToken(user);
    const refreshToken = generateRefreshToken(session._id);
    
    session.refreshTokenHash = await hashPassword(refreshToken);;
    await session.save();

    return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async({refreshToken}) => {
    if(!refreshToken) {
        throw new Error("No refresh token provided");
    }

    const payload = verifyRefreshToken(refreshToken);
    const session = await Session.findById(payload.sessionId);

    if(!session || !session.isValid) {
        throw new Error("Invalid session");
    }

    const isMatch = await comparePassword(
        refreshToken,
        session.refreshTokenHash
    );

    if(!isMatch) {
        throw new Error("Invalid refresh token");
    }

    //Rotate refresh token
    const newRefreshToken = generateRefreshToken(session._id);
    session.refreshTokenHash = await hashPassword(newRefreshToken);
    await session.save();

    const user = await User.findById(session.userId);
    const newAccessToken = generateAcessToken(user);

    return { newAccessToken, newRefreshToken };
};

export const logoutUser = async({refreshToken}) => {
    const payload = verifyRefreshToken(refreshToken);
    await Session.findByIdAndUpdate(payload.sessionId, {
        isValid: false,
    });
};