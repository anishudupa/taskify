import { Request, Response } from "express";
import Task from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
	const { title, description, status, priority } = req.body;
	try {
		const task = new Task({
			title,
			description,
			status,
			priority,
			user: req.headers["user"],
		});

		await task.save();
		res.status(201).json({ task });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

export const getTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await Task.find({ user: req.headers["user"] });
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

export const updateTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const task = await Task.findOneAndUpdate(
			{ _id: id, user: req.headers["user"] },
			updates,
			{ new: true }
		);
		if (!task) {
			return res.status(400).json({ message: "Task not found" });
		}
		res.json(task);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const task = Task.findOneAndDelete({ _id: id, user: req.headers["user"] });
		if (!task) {
			return res.status(400).json({ error: "Task not found" });
		}
		res.json({ message: "Task deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};
