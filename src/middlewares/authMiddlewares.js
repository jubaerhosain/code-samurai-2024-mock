import utils from "../utils/utils.js";

export async function checkAuthentication(req, res, next) {
    try {
        const bearerToken = req.headers.authorization;
        const authToken = bearerToken ? bearerToken.split(" ")[1] : null;
        const signedCookie = req.signedCookies[process.env.AUTH_COOKIE_NAME];
        
        const token = signedCookie || authToken;

        if (!token) {
            return res.status(401).json({ message: "No auth token is provided" });
        }

        const decodedToken = utils.verifyJwtToken(token);

        if (!decodedToken) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        req.user = decodedToken;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred while authenticating" });
    }
}

export async function isAdmin(req, res, next) {
    const user = req.user;
    if (user.userType === "admin") {
        next();
    } else {
        return res.status(403).json(GenericResponse.error("You are not allowed"));
    }
}
