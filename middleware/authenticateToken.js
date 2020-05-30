const config = require('config');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({
            msg: 'Authentication Error'
        });
    }
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }catch(e){
        return res.status(401).json({
            msg: 'Authentication Error'
        });
    }
};