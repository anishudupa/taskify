export default interface Task {
	id: string;
	title: string;
	description: string;
	status: "In Progress" | "Pending" | "Completed";
	priority: "High" | "Medium" | "Low";
}
