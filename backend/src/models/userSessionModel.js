import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User model
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String, // Store the user's IP address for security purposes
    },
    userAgent: {
      type: String, // Store the user's device information (optional)
    },
    expiresAt: {
      type: Date, // Expiry time for access tokens
      required: true,
    },
  },
  { timestamps: true }
);

const UserSession = mongoose.model("UserSession", userSessionSchema);

export default UserSession;
