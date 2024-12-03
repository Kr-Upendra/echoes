import mongoose from "mongoose";
import crypto from "crypto";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new Schema(
  {
    street: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    country: { type: String, default: null },
    zipcode: { type: String, default: null },
  },
  { _id: false }
);

const socialMediaSchema = new Schema(
  {
    facebook: { type: String, default: null },
    thread: { type: String, default: null },
    twitter: { type: String, default: null },
    instagram: { type: String, default: null },
    website: { type: String, default: null },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    profileBanner: {
      type: String,
      default: null,
    },
    userRole: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    about: {
      type: String,
      default: null,
    },
    address: addressSchema,
    socialMedia: socialMediaSchema,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("email")) {
    const emailUsername = this.email
      .split("@")[0]
      .replace(/\./g, "")
      .toLowerCase();

    let userName = emailUsername;
    let suffix = 1;

    while (await this.constructor.findOne({ userName })) {
      userName = `${emailUsername}${suffix}`;
      suffix++;
    }
    this.userName = userName;
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken, resetPasswordToken: this.passwordResetToken });

  this.passwordResetExpire = Date.now() + 60 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export { User as userModel };
