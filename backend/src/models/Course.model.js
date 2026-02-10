import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
    },

    description: {
      type: String
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      index: true
    },

    tags: {
      type: [String],
      index: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
