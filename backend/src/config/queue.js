import { Queue } from "bullmq";

export const redisConnection = {
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
}
export const aiQueue = new Queue("ai-tasks", {
  connection: redisConnection
});
