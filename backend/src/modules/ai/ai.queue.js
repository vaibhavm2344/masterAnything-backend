import { Queue } from "bullmq";
import {redisConnection} from "../../config/queue.js";

export const aiQueue = new Queue("ai-jobs", {
  connection: redisConnection
});
