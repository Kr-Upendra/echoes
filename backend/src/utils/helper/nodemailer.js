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
  host: "smtp.mailgun.org",
  port: 587,
  secure: true,
  auth: {
    user: "api",
    pass: process.env.MAILGUN_API_KEY,
  },
});

const transporter =
  process.env.NODE_ENV === "production" ? prodTransporter : devTransporter;

export const sendEmail = async (to, subject, template) => {
  try {
    await transporter.sendMail({
      from: `"El Echoes | Capture Your Moments, Keep Your Memories" <mailgun@sandbox55813286d6b84558a7cfdff5ad233be3.mailgun.org>`,
      to: to,
      subject: subject,
      html: template,
    });
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
