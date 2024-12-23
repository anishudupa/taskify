import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Task from "../types/Task";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TaskCard = ({
	task,
	setTasks,
}: {
	task: Task;
	setTasks: React.Dispatch<React.SetStateAction<[] | Task[]>>;
}) => {
	const navigate = useNavigate();
	const priorityColors = {
		High: "bg-red-500",
		Medium: "bg-yellow-500",
		Low: "bg-green-500",
	};

	const statusColors = {
		"In Progress": "text-yellow-400",
		Pending: "text-gray-400",
		Completed: "text-green-400",
	};

	const deleteTask = async (id: string) => {
		try {
			await API.delete(`/tasks/${id}`);
			setTasks((prev) => prev.filter((ele) => ele._id != task._id));
		} catch (error: any) {
			toast.error(error.response?.data?.message || "failed to delete task");
		}
	};

	return (
		<div className="bg-[#2c2c2c] p-6 rounded-lg shadow-lg text-white hover:scale-105 transition-transform duration-300 relative">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-xl font-bold">{task.title}</h3>
				<span
					className={`px-3 py-1 text-sm rounded-full ${
						priorityColors[task.priority]
					} text-white`}>
					{task.priority}
				</span>
			</div>
			<p className="text-gray-400 mb-4">{task.description}</p>
			<span className={`text-sm ${statusColors[task.status]}`}>
				{task.status}
			</span>

			<div className="mt-4 flex justify-end space-x-4">
				<FaEdit
					className="text-blue-500 hover:text-blue-600 cursor-pointer transition duration-200"
					onClick={() => navigate("/update-task", { state: task })}
				/>
				<FaTrash
					className="text-red-500 hover:text-red-600 cursor-pointer transition duration-200"
					onClick={() => deleteTask(task._id)}
				/>
			</div>
		</div>
	);
};

const TaskListPage = () => {
	const [tasks, setTasks] = useState<Task[] | []>([]);
	useEffect(() => {
		(async function () {
			try {
				const res = await API.get(`/tasks`);
				setTasks(res.data.tasks);
			} catch (error: any) {
				toast.error(error.response?.data?.message || "Failed to fetch tasks");
			}
		})();
	}, []);

	return (
		<div className="p-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-white">Task List</h1>
				<Link to="/add-task">
					<button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-600 transition duration-300">
						<FaPlus />
						<span>Add Task</span>
					</button>
				</Link>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
				{tasks.length === 0 ? (
					<p className="text-white">No tasks available.</p>
				) : (
					tasks.map((task) => (
						<TaskCard key={task._id} task={task} setTasks={setTasks} />
					))
				)}
			</div>
		</div>
	);
};

const Home = () => {
	return <TaskListPage />;
};

export default Home;
