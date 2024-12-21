import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<main className="bg-[#1b1b1c] text-white h-screen w-auto">
					<Signup />
					{/* <Login /> */}
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;
