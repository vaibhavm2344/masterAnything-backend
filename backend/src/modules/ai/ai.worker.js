import { Worker } from "bullmq";
import {redisConnection} from "../../config/queue.js";
import { generatePlanFromGemini } from "./ai.service.js";
import Planner from "../../models/Planner.model.js";

export const aiWorker = new Worker(
  "ai-jobs",
  async (job) => {
    const { plannerId, topic, days } = job.data;

    try {
      const plan = await generatePlanFromGemini({ topic, days });

      await Planner.findByIdAndUpdate(plannerId, {
        plan,
        status: "completed"
      });
    } catch (err) {
      await Planner.findByIdAndUpdate(plannerId, {
        status: "failed"
      });
      throw err;
    }
  },
  {
    connection: redisConnection
  }
);
