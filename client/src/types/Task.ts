export default interface Task {
	_id: string;
	title: string;
	description: string;
	status: "In Progress" | "Pending" | "Completed";
	priority: "High" | "Medium" | "Low";
}
