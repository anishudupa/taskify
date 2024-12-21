import { z, ZodSchema } from "zod";
import { useForm } from "react-hook-form";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signup() {
	const [showPassword, setShowPassword] = useState(false);

	const signupSchema: ZodSchema = z.object({
		username: z.string().min(1, "username must be provided"),
		email: z.string().email("provide a valid email"),
		password: z
			.string()
			.min(8, "password must be at least 8 characters")
			.max(20, "password can only be up to 20 characters long"),
	});

	type TSignupSchema = z.infer<typeof signupSchema>;

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		reset,
	} = useForm<TSignupSchema>({
		resolver: zodResolver(signupSchema),
	});

	//TODO: ADD SIGNUP LOGIC
	const onSubmit = (data: any) => {
		console.log(data);
		reset();
	};

	return (
		<>
			<div className="flex justify-center items-center h-screen">
				<div className="w-full h-auto">
					<h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
						Create an Account
					</h2>
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							{/* Username Field */}
							<div>
								<label
									htmlFor="username"
									className="block text-sm/6 font-medium text-white">
									Username
								</label>
								<div className="mt-2">
									<input
										{...register("username")}
										id="username"
										name="username"
										type="text"
										autoComplete="username"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-950 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
									/>
									{/* Displaying the error message if it exists */}
									{errors.username && (
										<span className="text-[#ff0303] text-sm">
											{errors.username.message as ReactNode}
										</span>
									)}
								</div>
							</div>

							{/* Email Field */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm/6 font-medium text-white">
									Email address
								</label>
								<div className="mt-2">
									<input
										{...register("email")}
										id="email"
										name="email"
										autoComplete="email"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-950 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
									/>
									{/* Displaying the error message if it exists */}
									{errors.email && (
										<span className="text-[#ff0303] text-sm">
											{errors.email.message as ReactNode}
										</span>
									)}
								</div>
							</div>

							{/* Password Field */}
							<div>
								<div className="flex items-center justify-between">
									<label
										htmlFor="password"
										className="block text-sm/6 font-medium text-white">
										Password
									</label>
								</div>
								<div className="mt-2 relative">
									<input
										{...register("password")}
										id="password"
										name="password"
										type={showPassword ? `text` : `password`}
										autoComplete="current-password"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-950 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
									/>
									{/* Displaying the error message if it exists */}
									{errors.password && (
										<span className="text-[#ff0300] text-sm">
											{errors.password.message as ReactNode}
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
							</div>
							<div>
								<button
									type="submit"
									className={`flex w-full justify-center rounded-md${
										isSubmitting ? "bg-slate-500" : " bg-indigo-600"
									} px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
									disabled={isSubmitting}>
									Sign up
								</button>
							</div>
						</form>

						<p className="mt-10 text-center text-sm/6 text-gray-500">
							already have an account?{" "}
							<Link
								to="/login"
								className="font-semibold text-indigo-600 hover:text-indigo-500">
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
