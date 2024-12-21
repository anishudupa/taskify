import { useTaskStore } from "../store/taskStore";

export const useTasks = () => {
	const { addTask, updateTask, deleteTask, tasks } = useTaskStore();
	return { addTask, updateTask, deleteTask, tasks };
};
