import express from "express";
import { deleteUser, requestOtp, signin, verifyCreateUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post('/signup', requestOtp);
authRouter.post('/verify-otp', verifyCreateUser);
authRouter.post('/signin', signin);
authRouter.delete('/delete-user', authMiddleware, deleteUser);


export default authRouter;