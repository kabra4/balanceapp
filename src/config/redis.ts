import Redis from "ioredis";

export const redis = new Redis.default({
	host: "redis",
	port: 6379
});
