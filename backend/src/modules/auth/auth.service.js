import User from '../../models/User.model.js';
import Session from '../../models/Session.model.js';
import { hashPassword } from '../../utils/hash.js';
import { generateAcessToken, generateRefreshToken } from '../../utils/jwt.js';

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