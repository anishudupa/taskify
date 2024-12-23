import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z, ZodSchema } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import API from "../api/axios";
import { toast } from "react-toastify";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const signUpSchema: ZodSchema = z.object({
		email: z.string().email("Invalid email"),
		password: z.string().min(8, "Password must be atleast 8 characters"),
	});

	type TSignUpSchema = z.infer<typeof signUpSchema>;

	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TSignUpSchema>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = async (data: any) => {
		try {
			const res = await API.post(`/users/login`, data);
			const { message, token } = res.data;
			localStorage.setItem("token", token);
			toast.success(message);
			navigate("/");
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
		reset();
	};
	return (
		<div className="flex justify-center items-center min-h-screen bg-[#1b1b1c] p-4">
			<div className="w-full max-w-md bg-[#2c2c2c] p-8 rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold text-white text-center mb-6">
					Login
				</h2>

				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="email" className="text-white text-sm font-medium">
							Email Address
						</label>
						<input
							{...register("email")}
							id="email"
							name="email"
							className="w-full p-3 mt-2 bg-[#3a3a3a] text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your email"
						/>
						{errors.email && (
							<span className="text-[#ff030f] font-semibold">
								{errors.email.message as React.ReactNode}
							</span>
						)}
					</div>

					<div className="relative">
						<label
							htmlFor="password"
							className="text-white text-sm font-medium">
							Password
						</label>
						<input
							{...register("password")}
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							className="w-full p-3 mt-2 bg-[#3a3a3a] text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
							placeholder="Enter your password"
						/>
						{errors.password && (
							<span className="text-[#ff030f] font-semibold">
								{errors.password.message as React.ReactNode}
							</span>
						)}
						{showPassword ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="absolute inset-y-0 right-3 w-10 h-10 text-gray-600 hover:cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								onClick={() => setShowPassword((prev) => !prev)}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 4.5C8.134 4.5 5 7.134 5 10.5S8.134 16.5 12 16.5 19 13.866 19 10.5 15.866 4.5 12 4.5zM12 7a3 3 0 100 6 3 3 0 000-6z"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="absolute inset-y-0 right-3 w-10 h-10 text-gray-600 hover:cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								onClick={() => setShowPassword((prev) => !prev)}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 4.5C8.134 4.5 5 7.134 5 10.5S8.134 16.5 12 16.5 19 13.866 19 10.5 15.866 4.5 12 4.5zM12 7a3 3 0 100 6 3 3 0 000-6z"
								/>
								<line
									x1="4"
									y1="4"
									x2="17"
									y2="17"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
								/>
							</svg>
						)}
					</div>

					<button
						type="submit"
						className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isSubmitting}>
						Login
					</button>
				</form>

				<div className="mt-4 text-center">
					<p className="text-sm text-gray-400">
						Don't have an account?{" "}
						<Link to="/signup" className="text-blue-500 hover:text-blue-700">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
