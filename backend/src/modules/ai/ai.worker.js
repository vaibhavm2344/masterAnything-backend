import { Worker } from "bullmq";
import {redisConnection} from "../../config/queue.js";
import { generatePlanFromGemini } from "./ai.service.js";
import Planner from "../../models/Planner.model.js";
import connectDB from "../../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const aiWorker = new Worker(
  "ai-jobs",
  async (job) => {
    console.log("Job received:", job.id, job.name);
    // console.log("plannerId:", job.data.plannerId);
    const { plannerId, topic, days } = job.data;

    try {
      const plan = await generatePlanFromGemini({ topic, days });
      // console.log("Generated plan:", plan);
      const result = await Planner.findByIdAndUpdate(plannerId, {
        plan,
        status: "completed"
      }, { new: true });
      // console.log("✅ Planner updated:", result);
    } catch (err) {
      console.error("❌ Job error:", err.message);
      try {
        await Planner.findByIdAndUpdate(plannerId, {
          status: "failed"
        });
      } catch (updateErr) {
        console.error("❌ Failed to update status to failed:", updateErr.message);
      }
      throw err;
    }
  },
  {
    connection: redisConnection
  }
);

aiWorker.on("ready", () => {
  console.log("✅ AI Worker ready & listening");
});

aiWorker.on("failed", (job, err) => {
  console.error("❌ Job failed:", job?.id, err.message);
});

// Connect to database and start worker
(async () => {
  try {
    await connectDB();
    console.log("✅ Worker connected to MongoDB");
  } catch (err) {
    console.error("❌ Worker failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
})();
