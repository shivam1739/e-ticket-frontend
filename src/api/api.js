import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

API.interceptors.request.use((req) => {
	const token = Cookies.get("authToken");
	if (token) {

		req.headers["x-access-token"] = token;
	}
	return req;
});

export default API;
