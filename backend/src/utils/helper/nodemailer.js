import nodemailer from "nodemailer";

console.log("SENDGRID_SMTP_USERNAME", process.env.SENDGRID_SMTP_USERNAME);
console.log("SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDGRID_API_KEY,
    pass: process.env.SENDGRID_SMTP_USERNAME,
  },
});

export const sendEmail = async (to, firstname, lastname, subject) => {
  try {
    const info = await transporter.sendMail({
      from: `"El Echoes | Capture Your Moments, Keep Your Memories <toxic74412@gmail.com>"`,
      to,
      subject,
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">Hi ${firstname + " " + lastname},</h2>
            <p>Thank you for registering with <strong><a href="https://el-echoes.netlify.app" target="_blank" style="color: #22C55E; text-decoration: none;">El Echoes</a></strong>! 🎉 We're thrilled to have you onboard.</p>
            <p>Start creating, sharing, and cherishing your unforgettable moments with ease.</p>
            <br />
            <h3>Here's what you can do next:</h3>
            <ul>
              <li><a style="color: #22C55E; text-decoration: none;" href="https://el-echoes.netlify.app/login" target="_blank">Log in</a> to your account and explore the features.</li>
              <li>Add your first memory to get started.</li>
            </ul>
            <p>If you have any questions, feel free to reach out to us. We're here to help!</p>
            <p>Happy exploring! 🌟</p>
            <p><strong>El Echoes Team</strong></p>
           </div>
        `,
    });

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
