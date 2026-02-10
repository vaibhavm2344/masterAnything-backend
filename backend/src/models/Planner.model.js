import mongoose from "mongoose";

const plannerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true
    },

    topic: {
      type: String,
      index: true
    },

    days: {
      type: Number
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending"
    },

    plan: {
      type: Object
    }
  },
  { timestamps: true }
);

export default mongoose.model("Planner", plannerSchema);
