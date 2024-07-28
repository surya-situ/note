import express from "express";
import { requestOtp, signin, verifyCreateUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/signup', requestOtp);
authRouter.post('/verify-otp', verifyCreateUser);
authRouter.post('/signin', signin);


export default authRouter;