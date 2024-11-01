const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { z } = require('zod');

// define the schema for user registration validation using zod
const registerSchema = z.object({
    username: z.string()
        .min(3, { message: "username must be at least 3 characters long" })
        .max(30, { message: "username must not exceed 30 characters" }),  
    email: z.string().email({ message: "invalid email address format" }),  
    password: z.string()
        .min(6, { message: "password must be at least 6 characters long" })
        .max(20, { message: "password must not exceed 20 characters" })
        .regex(/[a-z]/, { message: "password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "password must contain at least one number" })
});

// register a new user
exports.register = async (req, res) => {
    try {
        // validate the request body using zod
        const { username, email, password } = registerSchema.parse(req.body);
        
        
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "user already exists" });
        }
        
        // create a new user instance
        user = new User({ username, password, email });
        
        // hash the password
        const salt = await bcrypt.genSalt(5);
        user.password = await bcrypt.hash(password, salt);
        
        
        await user.save();

        // create a jwt payload
        const payload = {
            user: {
                id: user._id
                
            }
        };
        
        // sign the jwt and send it as response
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        
        if (err instanceof z.ZodError) {
            return res.status(400).json({ errors: err.errors });
        }
        
        console.error(err.message);
        res.status(500).send('server error');
    }
};


exports.login = async (req, res) => {
    // define the schema for user login validation using zod
    const loginSchema = z.object({
        email: z.string().email({ message: "invalid email address format" }),  
        password: z.string()
            .min(6, { message: "password must be at least 6 characters long" })
            .max(20, { message: "password must not exceed 20 characters" })
            .regex(/[a-z]/, { message: "password must contain at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "password must contain at least one uppercase letter" })
            .regex(/[0-9]/, { message: "password must contain at least one number" })
    });
    try {
        // validate the request body using zod
        const { email, password } = loginSchema.parse(req.body);
        
        
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        
        // compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        
        // create a jwt payload
        const payload = { user: { id: user.id } };
        
        // sign the jwt and send it as response
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        
        if (err instanceof z.ZodError) {
            return res.status(400).json({ errors: err.errors });
        }
        
        console.error(err.message);
        res.status(500).send('server error');
    }
};