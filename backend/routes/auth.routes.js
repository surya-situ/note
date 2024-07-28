import express from "express";
import { requestOtp, verifyCreateUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/signup', requestOtp);
authRouter.post('/verify-otp', verifyCreateUser);


export default authRouter;