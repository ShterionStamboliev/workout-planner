import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Homepage/Home";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Loginpage/Login";

function App() {
	return (
		<>
			<div className="App">
				<BrowserRouter>
				<Navbar />
					<div className="pages">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
						</Routes>
					</div>
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
