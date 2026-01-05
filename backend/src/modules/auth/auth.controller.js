import { registerUser } from "./auth.service.js";
import { validateRegisterInput } from "./auth.validation.js";

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
            secure: true,       //what is secure here? It means cookie is only sent over HTTPS
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