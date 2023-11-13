import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";
import Home from "./components/Homepage/Home";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer, Zoom } from "react-toastify";
import UpdateForm from "./components/WorkoutUpdateForm/UpdateForm";

function App() {

	const { user } = useAuthContext();

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
							<Route path="/update/:id" element={<UpdateForm />} />
						</Routes>
					</div>
				</BrowserRouter>

				<ToastContainer
					autoClose={3000}
					transition={Zoom}
				/>
			</div>
		</>
	);
}

export default App;
