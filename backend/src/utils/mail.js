import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOSTNAME,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
});

export const sendMail = async (user, otp) => {
  const info = await transporter.sendMail({
    from: `"Auth App" <no-reply@authapp.com>`,
    to: user.email,
    subject: "Verify your Email Address ✔",
    html: `<p>Welcome, your account has been created. Please verify your email by clicking this following link <a href="http://localhost:5173/verify-email?userId=${user.id}">Verify Email</a></p>
    <p>Your OTP is <b>${otp}</b></p>
    <p>This OTP expires in <b>5 minutes</b>. Please do not share this code with anyone for security reasons.</p>
    `, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};
