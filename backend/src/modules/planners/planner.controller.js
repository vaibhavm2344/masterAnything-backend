import * as plannerService from "./planner.service.js";

export const createPlanner = async (req, res) => {
  const { topic, days } = req.body;

  const planner = await plannerService.createPlanner({
    userId: req.user.id,
    topic,
    days
  });

  res.status(201).json({
    message: "Planner creation started",
    plannerId: planner._id
  });
};

export const getPlanner = async (req, res) => {
  const planner = await plannerService.getPlannerById(req.params.id);

  if (!planner) {
    return res.status(404).json({ message: "Planner not found" });
  }

  res.json(planner);
};
