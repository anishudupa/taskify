import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/user.route";
import taskRoutes from "./routes/task.route";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
dotenv.config();

const PORT = process.env.PORT || 5000;

async function main() {
	await connectDB();
	app.get("/", (_, res: Response) => {
		res.json({ message: "api is running" });
	});

	app.use("/api/users", userRoutes);
	app.use("/api/tasks", taskRoutes);

	app.listen(PORT, () => console.log("SERVER IS RUNNING ON PORT:", PORT));
}

main();
