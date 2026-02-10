import { aiQueue } from "../../config/queue.js";

export const generatePlan = async (req, res, next) => {
  try {
    const { topic, days } = req.body;

    const job = await aiQueue.add("generate-plan", {
      topic,
      days,
      userId: req.user.id
    });

    res.status(202).json({
      message: "Plan generation started",
      jobId: job.id
    });
  } catch (err) {
    next(err);
  }
};
