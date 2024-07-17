import { Request, Response } from "express";
import { TaskHistory } from "../models/TaskHistory.js";
import { createTaskHistorySchema, updateTaskHistorySchema } from "../schemas/taskHistory.js";

export const getAllTasks = async (_: Request, res: Response) => {
	const tasks = await TaskHistory.findAll({
		where: {},
		order: [["startTime", "DESC"]]
	});
	res.json(tasks);
};

// CREATE
export async function createTaskHistory(req: Request, res: Response) {
	try {
		const parsed = createTaskHistorySchema.parse(req.body);
		const newTaskHistory = await TaskHistory.create(parsed);
		res.status(201).json(newTaskHistory);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

// READ
export async function getTaskHistory(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const taskHistory = await TaskHistory.findByPk(id);
		if (taskHistory) {
			res.status(200).json(taskHistory);
		} else {
			res.status(404).json({ error: "TaskHistory not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

// UPDATE
export async function updateTaskHistory(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const updateData = updateTaskHistorySchema.parse(req.body);
		const taskHistory = await TaskHistory.findByPk(id);
		if (taskHistory) {
			const updatedTaskHistory = await taskHistory.update(updateData);
			res.status(200).json(updatedTaskHistory);
		} else {
			res.status(404).json({ error: "TaskHistory not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

// DELETE
export async function deleteTaskHistory(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const deleted = await TaskHistory.destroy({ where: { id } });
		if (deleted) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: "TaskHistory not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}
