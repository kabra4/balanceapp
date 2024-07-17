import { z } from "zod";

const createTaskHistorySchema = z.object({
	taskName: z.string(),
	schedule: z.string()
});

const updateTaskHistorySchema = z.object({
	taskName: z.string().optional(),
	schedule: z.string().optional()
});

export { createTaskHistorySchema, updateTaskHistorySchema };
