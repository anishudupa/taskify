import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { genereateToken } from "../utils/jwt.util";
import { ObjectId } from "mongoose";

export const registerUser = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "user already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 13);

		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();
		res.status(201).json({ message: "user created successfully" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = genereateToken((user._id as ObjectId).toString());
		return res.json({ token, user });
	} catch (error) {}
};
