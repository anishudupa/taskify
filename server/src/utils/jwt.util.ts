import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
export const genereateToken = (userId: string) => {
	return jwt.sign(userId, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error) {
		throw new Error("invalid or expired token");
	}
};
