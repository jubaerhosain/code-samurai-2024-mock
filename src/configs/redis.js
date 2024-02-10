import Redis from "ioredis";
import config from "./config.js";

export const redisClient = new Redis(6379, config.redis.host);

redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err.message);
});

redisClient.on("connect", () => {
    console.log("Redis connection has been established successfully.");
});

redisClient.on("close", () => {
    console.log("Redis connection closed.");
});

export function initializeRedisConnection() {
    // In ioredis, you don't need to manually connect. The client automatically connects.
    // You can simply call this function to initialize the connection if needed.
}

export default redisClient;
