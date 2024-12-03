import nodemailer from "nodemailer";

const devTransporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const prodTransporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDGRID_SMTP_USERNAME,
    pass: process.env.SENDGRID_API_KEY,
  },
});

const transporter =
  process.env.NODE_ENV === "production" ? prodTransporter : devTransporter;

export const sendEmail = async (to, subject, template) => {
  try {
    const info = await transporter.sendMail({
      from: `"El Echoes | Capture Your Moments, Keep Your Memories" <toxic74412@gmail.com>`,
      to: to,
      subject: subject,
      html: template,
    });

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
