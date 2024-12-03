import { passwordResetTemplate, sendEmail } from "../utils/index.js";

export const testEmail = async (req, res) => {
  try {
    const testEmail = "admin@elechoes.net";
    const template = passwordResetTemplate(
      "Alex Smith",
      "http://el-ehoes.netlify.app/reset-password"
    );

    await sendEmail(testEmail, "Test email for password reset", template);
    return res.status(200).json({
      status: "success",
      message: "Email Test Route",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};
