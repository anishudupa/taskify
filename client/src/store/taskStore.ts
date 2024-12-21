import { create } from "zustand";

interface Task {
	id: string;
	title: string;
	description: string;
	status: string;
	priority: string;
}

interface TaskState {
	tasks: Task[];
	addTask: (task: Task) => void;
	updateTask: (task: Task) => void;
	deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()((set) => ({
	tasks: [],
	addTask: (task) =>
		set((state) => ({
			tasks: [...state.tasks, task],
		})),
	updateTask: (updatedTask) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id == updatedTask.id ? updatedTask : task
			),
		})),
	deleteTask: (id) =>
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		})),
}));
