import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    tags: { type: [String], default: null },
    isFavorite: { type: Boolean, default: false },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Note = model("Note", noteSchema);

export { Note as noteModel };
