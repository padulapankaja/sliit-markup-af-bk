const jwt = require('jsonwebtoken')

const { UNAUTHORIZED } = require('../util/http_response.json')
const format_response = require('../util/format.util');


// Check auth middlewares
module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization')
    if (!authHeader) {
        req.isAuth = false;
        return res.status(UNAUTHORIZED).json(format_response(null, false, 'Unauthorized'))
    }
    const token = authHeader.split(' ')[1]; //Authorization : Bearer <token>
    if (!token || token === '') {
        req.isAuth = false;
        return res.status(UNAUTHORIZED).json(format_response(null, false, 'Unauthorized'))
    }
    let decord_token;
    try {
        decord_token = jwt.verify(token, process.env.JWT_SCREAT); //compare the screat key
        if (!decord_token) {
            req.isAuth = false
            return res.status(UNAUTHORIZED).json(format_response(null, false, 'Token Invalid'))
        }
        req.is_auth = true;
        req.email = decord_token.email;
        req.role = decord_token.role;
        next();
    } catch (error) {
        req.isAuth = false;
        return res.status(UNAUTHORIZED).json(format_response(null, false, 'Token Invalid'))
    }
};
