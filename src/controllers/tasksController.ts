import { Request, Response } from "express";
import { TaskHistory } from "../models/TaskHistory.js";

export const getAllTasks = async (_: Request, res: Response) => {
	const tasks = await TaskHistory.findAll({
		where: {},
		order: [["startTime", "DESC"]]
	});
	res.json(tasks);
};
