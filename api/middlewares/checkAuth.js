const jsonWebToken = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
    console.log(req.headers);
    try {
        const token = await req.headers.authorization.split(' ')[1];
        jsonWebToken.verify(token, process.env.JWT_KEY);
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
};

module.exports = checkAuth;