import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.util";
import User from "../models/User";

export const authenticateUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.header("Authorization")?.split(" ")[1];
		if (!token) {
			return res.status(401).json({
				message: "Access denied, no token provided",
			});
		}

		const decoded = verifyToken(token) as { id: string };
		req.headers["user"] = decoded.id;
	} catch (error) {
		res.status(401).json({ message: "Invalid or expired token" });
	}
};
