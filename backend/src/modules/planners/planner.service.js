import Planner from "../../models/Planner.model.js";
import { aiQueue } from "../ai/ai.queue.js";

export const createPlanner = async ({ userId, topic, days }) => {
  const planner = await Planner.create({
    userId: userId,
    topic,
    days,
    status: "pending"
  });

  await aiQueue.add("generate-plan", {
    plannerId: planner._id,
    topic,
    days
  });

  return planner;
};

export const getPlannerById = async (plannerId) => {
  return Planner.findById(plannerId);
};
