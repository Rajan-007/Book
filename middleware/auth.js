const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    let token = req.header('x-auth-token');

    // Validate the presence of the token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Sanitize the token (remove leading/trailing spaces)
    token = token.trim();

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
