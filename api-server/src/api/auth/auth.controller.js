import config from "../../configs/config.js";
import { models } from "../../configs/mysql.js";
import utils from "../../utils/utils.js";

async function login(req, res, next) {
    const loginDto = req.body;

    const user = await models.User.findOne({
        where: { email: loginDto.email },
        raw: true,
    });

    if (!user) {
        return res.status(404).json({
            email: "email does not exist",
        });
    }

    const isVerified = await utils.verifyPassword(loginDto.password, user.password);
    if (!isVerified) {
        return res.status(401).json({
            message: "invalid email or password",
        });
    }

    const token = utils.generateJwtToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    });

    res.cookie(process.env.AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: config.jwt.expiry,
        signed: true,
    });

    res.json({
        message: "logged in successfully",
        token: token,
    });
}

async function logout(req, res, next) {
    res.clearCookie(config.cookie.authCookieName);
    res.json({ message: "logged out successfully" });
}

async function signup(req, res, next) {
    const signUpDto = req.body;

    const isUserExist = await models.User.findOne({
        where: { email: signUpDto.email },
        raw: true,
    });

    if (isUserExist) {
        return res.status(409).json({
            email: "email address already exists",
        });
    }

    const user = { ...signUpDto };
    user.role = "user";
    user.password = await utils.hashPassword(user.password);

    const createdUser = await models.User.create(user);
    
    user.id = createdUser.id;
    delete user.password;

    res.status(200).json(user);
}

export default { login, logout, signup };
