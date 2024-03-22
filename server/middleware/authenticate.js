const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token:', token);

    if (!token) {
        console.log('🦁 Token check failed: Authorization token is required');
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('🐘 Token decoded successfully:', decoded);
        req.user = decoded; // Attach user information to the request
        next();
    } catch (error) {
        console.error('🐍 Authentication error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateUser;