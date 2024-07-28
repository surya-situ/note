import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});

export const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "OTP code for verification",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <p>Dear User,</p>
                <p>We hope this message finds you well.</p>
                <p>Your One-Time Password (OTP) for account verification is: <strong>${otp}</strong></p>
                <p>Please enter this code in the required field to proceed.</p>
                <p>Thank you for your prompt attention to this matter.</p>
                <p>Best regards,<br>[Scribble]</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP send successfully.')
    } catch (error) {
        console.log('Error in sending email!', error);
    };
};