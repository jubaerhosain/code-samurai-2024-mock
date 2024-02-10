import Redis from "ioredis";
import config from "./config.js";

export const redisClient = new Redis(6379, config.redis.host);

export function initializeRedisConnection() {
    redisClient.on("error", (err) => {
        console.error("Redis Client Error:", err.message);
    });
    
    redisClient.on("connect", () => {
        console.log("Redis connection has been established successfully.");
    });
    
    redisClient.on("close", () => {
        console.log("Redis connection closed.");
    });
}

export default redisClient;
