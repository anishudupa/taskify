import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
const taskSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	status: z.enum(["Pending", "Completed", "In Progress"]).optional(),
	priority: z.enum(["Low", "Medium", "High"]).optional(),
});

type TTaskSchema = z.infer<typeof taskSchema>;

const UpdateTask = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const task = location.state;
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TTaskSchema>({
		resolver: zodResolver(taskSchema),
	});

	const onSubmit = async (data: any) => {
		try {
			await API.put(`/tasks/${task?._id}`, data);
			navigate("/");
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
		reset();
	};
	return (
		<div className="bg-[#1b1b1c] min-h-screen pt-16 p-4">
			<div className="w-full max-w-sm bg-[#2c2c2c] p-8 rounded-lg shadow-lg mx-auto">
				<h2 className="text-3xl font-bold text-white text-center mb-6">
					Update Task
				</h2>
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="title" className="text-white text-sm font-medium">
							Task Title
						</label>
						<input
							{...register("title")}
							name="title"
							className="w-full p-3 mt-2 bg-[#3a3a3a] text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter task title"
							defaultValue={task?.title}
						/>
						{errors.title && (
							<span className="text-red-600 font-semibold">
								{errors.title.message as ReactNode}
							</span>
						)}
					</div>

					<div>
						<label
							htmlFor="description"
							className="text-white text-sm font-medium">
							Task Description
						</label>
						<textarea
							{...register("description")}
							name="description"
							className="w-full p-3 mt-2 bg-[#3a3a3a] text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter task description"
							rows={4}
							defaultValue={task?.description}
						/>
						{errors.description && (
							<span className="text-red-600 font-semibold">
								{errors.description.message as ReactNode}
							</span>
						)}
					</div>

					<div className="flex space-x-4">
						<div className="w-1/2">
							<label
								htmlFor="status"
								className="text-white text-sm font-medium">
								Status
							</label>
							<select
								{...register("status")}
								name="status"
								className="w-full p-3 mt-2 bg-[#3a3a3a] text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								defaultValue={task?.status}>
								<option value="Pending">Pending</option>
								<option value="In Progress">In Progress</option>
								<option value="Completed">Completed</option>
							</select>
						</div>

						<div className="w-1/2">
							<label
								htmlFor="priority"
								className="text-white text-sm font-medium">
								Priority
							</label>
							<select
								{...register("priority")}
								name="priority"
								className="w-full p-3 mt-2 bg-[#3a3a3a] text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								defaultValue={task?.priority}>
								<option value="High">High</option>
								<option value="Medium">Medium</option>
								<option value="Low">Low</option>
							</select>
						</div>
					</div>

					<button
						type="submit"
						className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isSubmitting}>
						Update Task
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateTask;
