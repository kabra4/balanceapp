import express from "express";
import { User } from "./models/User.js";
import { up } from "./migration.js";
import { initTasks } from "./tasks/index.js";
import { config } from "./config/index.js";

import usersRouter from "./routes/usersRoute.js";
import tasksRouter from "./routes/tasksRoute.js";
import TaskHistory from "./models/TaskHistory.js";

const app = express();
app.use(express.json());

app.use("/user", usersRouter);
app.use("/task", tasksRouter);

export default app;

const run = async () => {
	await up();
	await User.findOrCreate({
		where: { id: 1 },
		defaults: { balance: 10000 }
	});
	// Ensure initial tasks are set up
	const taskSchedules = "0 */2 * * *"; // Every two hours as an example
	for (let i = 0; i < 10; i++) {
		await TaskHistory.findOrCreate({
			where: { taskName: `Initial_Task_${i}` },
			defaults: {
				schedule: taskSchedules
			}
		});
	}

	// tasks
	initTasks();

	app.listen(3000, () =>
		console.log(`Server ${config.hostname} running on http://localhost:3000`)
	);
};

run().catch(console.error);
