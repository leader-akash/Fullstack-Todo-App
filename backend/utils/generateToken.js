const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = async(userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d' // will convert days into mili seconds
    })
    res.cookie("jwtToken", token, {
        maxAge: 15*24*60*60*100, // miliseconsa format
        httpOnly: true, // prevents xss attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
       
    })

    return token;
}

module.exports = {generateTokenAndSetCookie}