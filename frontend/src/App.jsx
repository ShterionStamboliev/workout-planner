import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Homepage/Home";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

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
							<Route path="/register" element={<Register />} />
						</Routes>
					</div>
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
