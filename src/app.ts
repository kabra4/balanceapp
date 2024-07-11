import express from "express";
import { User } from "./models/User.js";
import { up } from "./migration.js";
import { initTasks } from "./tasks/index.js";
import { config } from "./config/index.js";

import usersRouter from "./routes/userRoutes.js";
import tasksRouter from "./routes/userRoutes.js";

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

	// tasks
	initTasks();

	app.listen(3000, () =>
		console.log(`Server ${config.hostname} running on http://localhost:3000`)
	);
};

run().catch(console.error);
