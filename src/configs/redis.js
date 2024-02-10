import Redis from "ioredis";
import config from "./config.js";

export const redisClient = new Redis(config.redis.port, config.redis.host);

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

    // key name convention ${entity:id}
    // setTimeout(() => {
    //     redisClient.set(
    //         "user:1",
    //         JSON.stringify({ id: 1, name: "jubaer hosain", email: "jubaer@gmail.com" }),
    //         "EX",
    //         10
    //     );
    // }, 1000);

    // setTimeout(async () => {
    //     const res = await redisClient.get("user:1");
    //     console.log(JSON.parse(res));
    // }, 3000);
}
