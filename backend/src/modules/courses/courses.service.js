import Course from "../../models/Course.model.js";
import { getCache, setCache } from "../../utils/cache.js";

export const getCourses = async ({
  page = 1,
  limit = 10,
  difficulty,
  tag,
  search,
}) => {
  page = Number(page);
  limit = Number(limit);
  const query = {};

  if (difficulty) query.difficulty = difficulty;
  if (tag) query.tags = tag;
  if (search) query.title = { $regex: search, $options: "i" };

  const cacheKey = `courses:${JSON.stringify({
    page,
    limit,
    difficulty,
    tag,
    search
  })}`;

  const cachedResult = await getCache(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }

  const skip = (page - 1) * limit;

  const [courses, total] = await Promise.all([
    Course.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
    Course.countDocuments(query),
  ]);

  const result = {
    data: courses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };

  await setCache(cacheKey, result, 300);
  return result;
};
