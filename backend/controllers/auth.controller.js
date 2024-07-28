import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { signupInputs } from "../validator/userValidator.js";
import User from "../models/user.model.js"
import { sendOtpEmail } from "../utils/mailer.js";
import { getUserData, saveOtp, saveUserData, verifyOtp } from "../utils/optStore.js";

export const requestOtp = async (req, res) => {
    const body = req.body;

    const inputValidation = signupInputs.safeParse(body);

    if(!inputValidation.success) {
        return res.status(400).json({
            status: "Failed",
            message: "Invalid inputs",
            error: inputValidation.error
        })
    };

    const { username, email, password } = body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                status: "Failed",
                message: "User already exists"
            });
        };

        const otp = Math.floor( 100000 + Math.random() * 900000).toString();

        await sendOtpEmail(email, otp);
        saveOtp(email, otp);
        saveUserData(email, {username, email, password});

        const tempToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "5m" } // Token expires in 5 minutes
        );

        res.status(200).json({
            status: "Success",
            message: "Otp send successfully",
            token: tempToken
        })

    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: "Internal errors!",
            data: error.message
        })
    }
};

export const verifyCreateUser = async (req, res) => {
    const { otp } = req.body;
    const tempToken = req.headers['authorization']?.split(' ')[1];

    if (!tempToken) {
        return res.status(400).json({
            status: 'Failed',
            message: 'Access denied! No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
        const email = decoded.email;

        if (!verifyOtp(email, otp)) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Invalid OTP'
            });
        }

        const userData = getUserData(email);

        if (!userData) {
            return res.status(400).json({
                status: 'Failed',
                message: 'User data not found'
            });
        }

        const { username, password } = userData;
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            status: 'Success',
            message: 'User successfully created.',
            token,
            data: newUser
        });

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'Failed',
                message: 'Token expired. Please request a new OTP.'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: 'Failed',
                message: 'Invalid token. Please request a new OTP.'
            });
        } else {
            return res.status(500).json({
                status: 'Failed',
                message: 'Internal server error',
                error: error.message
            });
        }
    }
};

export const signin = async ( req, res ) => {
    const { email, password } = req.body;

    try {
        const findUser = await User.findOne({ email });

        if(!findUser) {
            return res.status(403).json({
                status: "Failed",
                message: "User not found"
            })
        };

        const isPasswordValid = await bcryptjs.compare(password, findUser.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid email id or password!"
            })
        };

        const token = jwt.sign(
            { id: findUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        return res.status(200).json({
            status: "Success",
            message: "Signin successful",
            token,
            data: findUser
        })

    } catch (error) {
        return res.status(500).json({
            status: "Failed",
            message: "Internal server error",
            error: error.message
        });
    }
};

