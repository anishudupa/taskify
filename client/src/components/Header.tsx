import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Header() {
	const [username, setUsername] = useState("anonymus-user");

	const getUser = async () => {
		const res = await API.get(`/users/get-user`);
		setUsername(res.data.user.username);
	};

	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	useEffect(() => {
		if (token) {
			getUser();
		} else {
			setUsername("anonymus-user");
		}
	}, [token]);
	return (
		<header className="bg-[#1b1b1c] p-4 shadow-md border-b-2 border-gray-600 h-20 fixed w-full top-0 left-0 z-10">
			<div className="flex items-center justify-between text-white">
				{/* User Info */}
				<div className="flex items-center space-x-4">
					<FaUserAlt className="text-3xl" />
					<span className="text-xl font-bold">Hi, {username}</span>
				</div>

				{/* Logout or Login Button */}
				{!!token ? (
					<button
						onClick={() => {
							localStorage.removeItem("token");
							navigate("/login", { replace: true });
						}}
						className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-200">
						Logout
					</button>
				) : (
					<button
						onClick={() => {
							navigate("/login");
						}}
						className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-200">
						Login
					</button>
				)}
			</div>
		</header>
	);
}
