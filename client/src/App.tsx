import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import { BrowserRouter } from "react-router-dom";

// TODO: Add logic to each page, add Routes and add Protected route.
export default function App() {
	return (
		<BrowserRouter>
			<div>
				<header>
					<Header />
				</header>
				<main className="bg-[#1b1b1c] min-h-screen h-auto overflow-auto">
					{/* <Signup /> */}
					{/* <Login /> */}
					{/* <TaskListPage /> */}
					<AddTask />
					{/* <UpdateTask
						task={{
							title: "lol",
							id: "12",
							description: "some description",
							priority: "Low",
							status: "Completed",
						}}
					/> */}
				</main>
			</div>
		</BrowserRouter>
	);
}
