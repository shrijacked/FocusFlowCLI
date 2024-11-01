const jwt = require('jsonwebtoken');
const { z } = require('zod');


const authSchema = z.object({
    authorization: z.string().regex(/^Bearer\s.+$/, { message: "authorization header must be in the format 'Bearer <token>'" }),
});


const auth = (req, res, next) => {
    try {
        // validate the authorization header using zod
        const { authorization } = authSchema.parse(req.headers);

        // extract the token from the authorization header
        const token = authorization.replace('Bearer ', '');

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach the decoded user information to the request object
        req.user = decoded.user;

        // proceed to the next middleware or route handler
        next();
    } catch (err) {
        // handle validation errors
        if (err instanceof z.ZodError) {
            return res.status(400).json({ msg: 'Invalid authorization header format' });
        }

        // handle jwt verification errors
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Token is not valid' });
        }

        // handle other errors
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = auth;