import nodemailer from "nodemailer";

const devTransporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const prodTransporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

const transporter =
  process.env.NODE_ENV === "production" ? prodTransporter : devTransporter;

export const sendEmail = async (to, subject, template) => {
  try {
    await transporter.sendMail({
      from: `"El Echoes | Capture Your Moments, Keep Your Memories" <toxic74412@gmail.com>`,
      to: to,
      subject: subject,
      html: template,
    });
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
