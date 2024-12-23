import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Protect = ({ children }: { children: React.ReactNode }) => {
	const token = localStorage.getItem("token");
	if (!token) {
		return <Navigate to={"/signup"} replace />;
	} else return <>{children}</>;
};
export default function App() {
	return (
		<BrowserRouter>
			<div>
				<header>
					<Header />
				</header>
				<main className="bg-[#1b1b1c] pt-20 min-h-screen h-auto overflow-auto">
					<Routes>
						<Route
							path="/"
							element={
								<Protect>
									<Home />
								</Protect>
							}
						/>
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/add-task"
							element={
								<Protect>
									<AddTask />
								</Protect>
							}
						/>
						<Route
							path="/update-task"
							element={
								<Protect>
									<UpdateTask />
								</Protect>
							}
						/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}
