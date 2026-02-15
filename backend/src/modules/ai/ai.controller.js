import { aiQueue } from "../ai/ai.queue.js";
import Planner from "../../models/Planner.model.js";

export const generatePlan = async (req, res, next) => {
  try {
    const { topic, days } = req.body;

     const planner = await Planner.create({
      userId: req.user.id,
      topic,
      days,
      status: "pending"
    });

    const job = await aiQueue.add("generate-plan", {
      topic,
      days,
      plannerId: planner._id,
    });

    res.status(202).json({
      message: "Plan generation started",
      jobId: job.id
    });
  } catch (err) {
    next(err);
  }
};
