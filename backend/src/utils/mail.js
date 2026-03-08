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

export const sendMail = async (subject, email, html) => {
  const info = await transporter.sendMail({
    from: `"Auth App" <no-reply@authapp.com>`,
    to: email,
    subject: subject,
    html: html, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};
