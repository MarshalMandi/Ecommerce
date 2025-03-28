import jwt from "jsonwebtoken"

// jsonweb token will contain the info of userid and user role
export const generateToken = (clientInfo, res) => {
    const token = jwt.sign(clientInfo, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("EcommerceEntry", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,  //MS
        httpOnly: true,     //prevent XSS attacks cross-site scripting attacks
        sameSite: "strict",     //CSRF attacks cross-site request forgery attacks
        secure: true,
    });

    return token;
}