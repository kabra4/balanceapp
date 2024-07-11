import { redis } from "../config/redis.js";
import cron from "node-cron";
import { config } from "../config/index.js";
import TaskHistory from "../models/TaskHistory.js";

async function taskHandler(taskName: string) {
	const lock = await redis.set(`${taskName}_lock`, "locked", "EX", 120, "NX");
	if (lock) {
		const startTime = new Date();
		console.log(`${taskName} is running on ${config.hostname}`);

		// simulating long task
		await new Promise((resolve) => setTimeout(resolve, 2 * 60 * 1000)); // 2 minutes
		console.log(`${taskName} completed`);
		await TaskHistory.create({
			taskName,
			serverId: config.hostname,
			startTime,
			endTime: new Date()
		});
		await redis.del(`${taskName}_lock`);
	}
}

type Task = {
	name: string;
	interval: string;
	taskFunction: () => {};
};

const TASKS: Task[] = [];

// generating tasks for test purposes
for (let i = 0; i < 10; i++) {
	TASKS.push({
		name: "Task_" + i.toString(),
		interval: "*/120 * * * *",
		taskFunction: () => taskHandler("Task_" + i.toString())
	});
}
export const initTasks = () => {
	TASKS.forEach((task) => {
		cron.schedule(task.interval, task.taskFunction);
	});
};
