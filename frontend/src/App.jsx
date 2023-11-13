import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";
import Home from "./components/Homepage/Home";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer, Zoom } from "react-toastify";

function App() {

	const { user } = useAuthContext();

	return (
		<>
			<div className="App">
				<BrowserRouter>
					<Navbar />
					<div className="pages">
						<Routes>
							<Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
							<Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
							<Route path="/register" element={!user ? <Register /> : <Navigate to='/' />} />
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
