import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
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
    userRole: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    about: {
      type: String,
      default: null,
    },
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

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);

export { User as userModel };
