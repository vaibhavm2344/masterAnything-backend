import { getCourses } from "./courses.service.js";

export const listCourses = async (req, res, next) => {
  try {
    const result = await getCourses({
      ...req.query
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
