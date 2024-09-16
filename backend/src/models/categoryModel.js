import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required."],
      unique: [true, "Category title should be unique."],
    },
    slug: {
      type: String,
      required: [true, "Category slug is required."],
      unique: [true, "Category slug should be unique."],
    },
    description: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: "#000000",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export { Category as categoryModel };
