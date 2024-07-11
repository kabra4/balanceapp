import { Router } from "express";
import { getAllTasks } from "../controllers/tasksController.js";

const router = Router();

router.post("/status", getAllTasks);

export default router;
