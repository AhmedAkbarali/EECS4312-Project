const keys = require('../config/keys');
const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).message({message:"No token!"}); // if there isn't any token

    jwt.verify(token, keys.secret, (err, decoded) => {
        if (err) {
            return res.send("token not matched");//res.status(401).send({ message: "Unauthorized!" });
        } else {
            req.userId = decoded.id;
            next();
        }
    });
};