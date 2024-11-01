import { Schema, model } from "mongoose";

const voiceNoteSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: null },
    voiceNote: { type: String, required: true },
    tags: { type: [String], default: null },
    isFavorite: { type: Boolean, default: false },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const VoiceNote = model("VoiceNote", voiceNoteSchema);

export { VoiceNote as voiceNoteModel };
