import { Router } from "express";
import {
	getAllTasks,
	getTaskHistory,
	createTaskHistory,
	updateTaskHistory,
	deleteTaskHistory
} from "../controllers/tasksController.js";

const router = Router();

router.get("/status", getAllTasks);
router.get("/:id", getTaskHistory);
router.post("/", createTaskHistory);
router.put("/:id", updateTaskHistory);
router.get("/:id", deleteTaskHistory);

export default router;
