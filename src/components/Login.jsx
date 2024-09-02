import { useState } from "react";
import Cookies from "js-cookie";
import API from "../api/api";
import { toast } from "react-toastify";
import {
	saveTicketsToLocalStorage,
	saveUserDataToLocalStorage,
} from "../utils/storageFunctions";

const Login = () => {
	const [formData, setFormData] = useState({ email: "testuser@gmail.com", password: "test123" });
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await API.post("/auth/login", formData);
			if (data) {

				Cookies.set("authToken", data.token, { expires: 7 });

				saveUserDataToLocalStorage({
					id: data.data.id,
					name: data.data.username,
					email: data.data.email,
				});
				const ticketData = await API.get("/ticket/my/booking", {
					userID: data.data.id,
				});

				if (ticketData.data.length > 0 && !ticketData.message) {
					saveTicketsToLocalStorage(ticketData.data);
				}


				toast.success("Login successful! Redirecting to your profile...");


				setTimeout(() => {
					window.location.href = "/";
				}, 2000);
			} else {
				throw new Error("Login failed. Please try again.");
			}
		} catch (err) {

			toast.error(
				err.response?.data?.message || "Login failed. Please try again."
			);
			setError(
				err.response?.data?.message || "Login failed. Please try again."
			);
		}
	};

	return (
		<div className="  mx-auto p-6">
			<h2 className="text-3xl font-bold mb-6">Login</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="Email"
					className="w-full p-2 border border-gray-300 rounded"
				/>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Password"
					className="w-full p-2 border border-gray-300 rounded"
				/>
				<button
					type="submit"
					className={`bg-blue-600 text-white py-2 px-4 rounded ${!formData?.email && !formData?.password ? 'opacity-50 pointer-events-none' : ''
						}`}
				>
					Login
				</button>
				{error && <p className="text-red-600">{error}</p>}
			</form>
		</div>
	);
};

export default Login;
