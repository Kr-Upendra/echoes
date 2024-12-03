export const onBoardEmailTemplate = (firstname, lastname) => {
  return `
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
    `;
};

export const passwordResetTemplate = (username, resetUrl) => {
  return `
  <div
  style="
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    padding: 20px 30px;
  "
>
 <div
    style="
      display: flex;
      justify-content: center;
      justify-items: center;
      margin-bottom: 50px;
    "
  >
    <img
      style="width: 60px"
      src="https://qiehqccuygszbdxuuqjd.supabase.co/storage/v1/object/public/application/logos/icon_192x192.png?t=2024-12-03T13%3A59%3A12.508Z"
      alt="Logo_1"
    />
    <h1 style="margin-left: 4px; color: #22c55e">El Echoes</h1>
  </div>
  <div>
    <span style="color: #4caf50">Hello, <strong>${username}</strong></span>
  </div>
  <p>We received a request to reset the password for your El Echoes account.</p>
  <p>To reset your password, click the link below:</p>
  <p>
    <a style="color: #22c55e; text-decoration: none" href="${resetUrl}"
      >Reset My Password</a
    >
  </p>
  <p>
    If you didn't request this password reset, please ignore this email, and
    your password will remain unchanged.
  </p>
  <p>For security reasons, this link will expire in 1 hours.</p>
  <p>
    Best regards,<br />
    <strong style="color: #4caf50">El Echoes Team </strong>
  </p>
</div>

`;
};

export const suspiciousLoginTemplate = `
   <h1>Suspicious Login Attempt</h1>
    <p>Hello [User Name],</p>
    <p>We noticed a login to your [Your App Name] account from a new device or location. If this was you, you can ignore this message.</p>
    <p>If this wasn't you, please reset your password immediately to secure your account.</p>
    <p>Here's the login information:</p>
    <ul>
    <li><strong>Device:</strong> [Device Info]</li>
    <li><strong>Location:</strong> [Location Info]</li>
    <li><strong>Date & Time:</strong> [Date/Time of Login]</li>
    </ul>
    <p>To reset your password, click the link below:</p>
    <p><a href="[Reset Password Link]">Reset My Password</a></p>
    <p>If you need further assistance, please contact our support team.</p>
    <p>Best regards,<br>[Your App Name] Team</p>
`;

export const reminderTemplate = `
    <h1>Reminder: [Event/Subscription] is Coming Up!</h1>
    <p>Hello [User Name],</p>
    <p>This is a reminder that your [Event/Subscription] is scheduled for [Date/Time].</p>
    <p>Don't forget to [Action Required - e.g., renew your subscription, attend the event, etc.].</p>
    <p>If you need assistance or have any questions, feel free to contact us.</p>
    <p>Best regards,<br>[Your App Name] Team</p>
`;

export const appUpdateTemplate = `
    <h1>New Features in [Your App Name]</h1>
    <p>Hello [User Name],</p>
    <p>We are thrilled to announce some exciting new features and updates in [Your App Name]!</p>
    <h2>What's New:</h2>
    <ul>
    <li><strong>[Feature 1]</strong>: [Description]</li>
    <li><strong>[Feature 2]</strong>: [Description]</li>
    <li><strong>[Feature 3]</strong>: [Description]</li>
    </ul>
    <p>We hope these updates will help improve your experience with [Your App Name].</p>
    <p>Feel free to explore the new features and let us know your feedback!</p>
    <p>Best regards,<br>[Your App Name] Team</p>
`;
