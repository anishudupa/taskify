import { z } from "zod";

export const registerUserSchema = z.object({
	body: z.object({
		name: z.string().min(3, "Name must be atleast three characters long"),
		email: z.string().email("Invalid email format"),
		password: z
			.string()
			.min(8, "Password must be atleast of length 8")
			.max(20, "Password can only be of length 20"),
	}),
});

export const loginUserSchema = z.object({
	body: z.object({
		email: z.string().email("Invalid email format"),
		password: z
			.string()
			.min(8, "Password must be atleast of length 8")
			.max(20, "Password can only be of length 20"),
	}),
});
