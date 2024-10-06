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
                <p>Your One-Time Password (OTP) for account verification
                <p><strong style="font-size: 24px; color: blue; margin: 20px 0">${otp}</strong></p>
                <p>Please enter this code in the required field to proceed.</p>
                <p>If you did not request this, you can ignore this email.</p>
                <p>Best regards,<br>Scribble team</p>
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