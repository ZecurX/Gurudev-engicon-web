import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, // your Gmail
    pass: process.env.SMTP_PASS, // 16-char app password
  },
});
