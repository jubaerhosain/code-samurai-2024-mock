import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../configs/config.js";

export async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    return passwordMatches;
}

export function generateOTP(numberOfDigit = 6) {
    let otp = "";
    for (let i = 0; i < numberOfDigit; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

function generateJwtToken(obj) {
    const token = jwt.sign(obj, config.jwt.secret, {
        expiresIn: process.env.JWT_EXPIRY,
    });
    return token;
}

function verifyJwtToken(token) {
    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        return decoded;
    } catch (err) {
        // console.log(err.message);
        return false;
    }
}

export default { hashPassword, verifyPassword, generateOTP, generateJwtToken, verifyJwtToken };
