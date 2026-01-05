import { registerUser, loginUser, refreshAccessToken, logoutUser } from "./auth.service.js";
import { validateRegisterInput, validateLoginInput } from "./auth.validation.js";

export const register = async(req, res, next) => {
    try{
        validateRegisterInput(req.body);

        const { name, email, password } = req.body;

        const { user, accessToken, refreshToken } = await registerUser({
            name,
            email,
            password,
            userAgent: req.headers['user-agent'],
            ip: req.ip,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',       //what is secure here? It means cookie is only sent over HTTPS
            sameSite: 'strict', //what is sameSite here? It prevents CSRF attacks
            maxAge: 7*24*60*60*1000, // 7 days
        });

        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            accessToken,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async(req, res, next) => {
    try{
        validateLoginInput(req.body);
        const {email, password} = req.body;
        const { user, accessToken, refreshToken } = await loginUser({
            email, 
            password,
            userAgent: req.headers['user-agent'],
            ip: req.ip,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000,
        });

        res.status(200).json({
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
            accessToken,
        });
    } catch (error) {
        next(error);
    }
};

export const refresh = async(req, res, next) => {
    try{
        const { refreshToken } = req.cookies;
        const { newAccessToken, newRefreshToken } = await refreshAccessToken({refreshToken});

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000,
        });

        res.json({
            accessToken: newAccessToken,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async(req, res, next) => {
    try{
        await logoutUser({refreshToken: req.cookies.refreshToken});
        res.clearCookie('refreshToken');
        res.json({ message: "Logged out"});
    } catch (error) {
        next(error);
    }
};