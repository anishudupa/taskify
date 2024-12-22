import { FaUserAlt } from "react-icons/fa";

export default function Header({ username }: any) {
	return (
		<>
			{/* Fixed Header */}
			<header className="bg-[#1b1b1c] p-4 shadow-md border-b-2 border-gray-600 fixed w-full top-0 left-0 z-10">
				<div className="flex items-center justify-between text-white">
					{/* Icon and Greeting */}
					<div className="flex items-center space-x-4">
						<FaUserAlt className="text-3xl" />
						<span className="text-xl font-bold">Hi, {username}</span>
					</div>

					{/* Logout Button */}
					<button
						onClick={() => console.log("Logging out...")}
						className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-200">
						Logout
					</button>
				</div>
			</header>
		</>
	);
}
