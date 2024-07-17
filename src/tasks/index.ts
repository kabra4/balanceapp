import cron from "node-cron";
import { config } from "../config/index.js";
import TaskHistory from "../models/TaskHistory.js";

// Set to track currently scheduled tasks
let scheduledTasks = new Set<string>();

// Task handler function to manage task execution based on database status
async function taskHandler(taskName: string) {
	const taskRecord = await TaskHistory.findOne({
		where: {
			taskName,
			status: "Pending"
		}
	});

	if (taskRecord) {
		await taskRecord.update({
			status: "In Progress",
			startTime: new Date()
		});

		console.log(`${taskName} is running on ${config.hostname}`);

		// Simulate a long task
		await new Promise((resolve) => setTimeout(resolve, 2 * 60 * 1000)); // 2 minutes

		console.log(`${taskName} completed`);
		await taskRecord.update({
			status: "Finished",
			endTime: new Date()
		});
	} else {
		console.log(`Skipping ${taskName}, as it is already in progress or finished.`);
	}
}

// Initialize tasks and dynamically schedule them based on their interval from the database
export const initTasks = async () => {
	const tasks = await TaskHistory.findAll();
	tasks.forEach((task) => {
		if (!scheduledTasks.has(task.taskName)) {
			cron.schedule(task.schedule, () => taskHandler(task.taskName), {
				scheduled: true
			});
			scheduledTasks.add(task.taskName);
			console.log(`Scheduled task: ${task.taskName} to run at interval: ${task.schedule}`);
		}
	});
};

// Function to check and initiate tasks if they are not currently scheduled
async function checkAndRunTasks() {
	const tasksToRun = await TaskHistory.findAll();
	tasksToRun.forEach((task) => {
		if (!scheduledTasks.has(task.taskName)) {
			cron.schedule(task.schedule, () => taskHandler(task.taskName), {
				scheduled: true
			});
			scheduledTasks.add(task.taskName);
			console.log(`Scheduled new task: ${task.taskName} at interval: ${task.schedule}`);
		}
	});
}

// Start the check for new tasks every minute
cron.schedule("* * * * *", () => checkAndRunTasks());
