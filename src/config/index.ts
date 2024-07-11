import dotenv from "dotenv";
import os from "os";
dotenv.config();

const requiredEnv = (key: string) => {
	if (!process.env[key]) {
		throw new Error(`Environment variable ${key} is required but not set.`);
	}
	return process.env[key];
};

export const config = {
	dbUser: requiredEnv("DB_USER"),
	dbPassword: requiredEnv("DB_PASSWORD"),
	dbHost: requiredEnv("DB_HOST"),
	dbPort: Number(requiredEnv("DB_PORT")),
	dbName: requiredEnv("DATABASE"),
	hostname: os.hostname()
};
