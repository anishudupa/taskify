import Task from "../types/Task";
import { FaEdit, FaTrash } from "react-icons/fa";

const tasks: Task[] = [
	{
		id: "1",
		title: "Complete project report",
		description:
			"Finish the final report for the Q4 project, including all data and analysis.",
		status: "In Progress",
		priority: "High",
	},
	{
		id: "2",
		title: "Design new landing page",
		description:
			"Create a new design layout for the upcoming marketing campaign's landing page.",
		status: "Pending",
		priority: "Medium",
	},
	{
		id: "3",
		title: "Fix bug in checkout system",
		description:
			"Resolve the issue where users can't complete their purchase in the checkout flow.",
		status: "In Progress",
		priority: "High",
	},
	{
		id: "4",
		title: "Prepare team meeting agenda",
		description:
			"Draft and circulate the agenda for the weekly team meeting scheduled for next Monday.",
		status: "Completed",
		priority: "Low",
	},
	{
		id: "5",
		title: "Update user documentation",
		description:
			"Revise and update the user guide to reflect recent changes in the app.",
		status: "Pending",
		priority: "Medium",
	},
];

const TaskCard = ({ task }: { task: Task }) => {
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
				<FaEdit className="text-blue-500 hover:text-blue-600 cursor-pointer transition duration-200" />
				<FaTrash className="text-red-500 hover:text-red-600 cursor-pointer transition duration-200" />
			</div>
		</div>
	);
};

const TaskListPage = () => {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold text-white mb-6">Task List</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};

const Home = () => {
	return <TaskListPage />;
};
export default Home;
