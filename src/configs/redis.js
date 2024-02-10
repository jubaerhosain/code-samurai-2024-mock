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

    // key name convention ${entity:id}
    setTimeout(() => {
        redisClient.set("user:1", JSON.stringify({ id: 1, name: "jubaer", email: "jubaer@gmail.com" }), (err, result) => {
            if(err) console.log(err.message);
        });
    }, 2000);

    setTimeout(async () => {
        const res = await redisClient.get("user:1");
        console.log(JSON.parse(res));
    }, 3000);


}

export default redisClient;
