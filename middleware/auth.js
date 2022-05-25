const jwt = require('jsonwebtoken')

function auth(req,res,next) {
    const token = req.header("x-token")
    if (!token) return res.send("No Token SET ")
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded

    } catch (ex) {
      return res
        .status(401)
        .send(`Unauthorized token =>  [[${req.header("x-token")}]]`);
    }

    next();
}
function admin(req,res,next) {
    if (!req.user.isAdmin)
        return res.status(403).send("You are not an ADMIN")

    next();
}



exports.auth = auth
exports.admin = admin
