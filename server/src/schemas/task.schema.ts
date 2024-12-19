import { z } from "zod";

export const createTaskSchema = z.object({
	body: z.object({
		title: z.string().min(1, "Title is required"),
		description: z.string().optional(),
		status: z.enum(["pending", "completed", "in-progress"]).optional(),
		priority: z.enum(["low", "medium", "high"]).optional(),
	}),
});

export const updateTaskSchema = z.object({
	body: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		status: z.enum(["pending", "completed", "in-progress"]).optional(),
		priority: z.enum(["low", "medium", "high"]).optional(),
	}),
	params: z.object({
		id: z.string().min(1, "Task id is required"),
	}),
});
