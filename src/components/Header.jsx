import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserRole } from "../utils/auth";

const Header = () => {
	const isLoggedIn = !!Cookies.get("authToken");
	const isAdmin = getUserRole();

	return (
		<header className="bg-blue-600 w-full text-white py-4 px-6">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">
					<Link
						to="/"
						className="text-white hover:opacity-70 hover:text-white cursor-pointer"
					>
						E-Ticketing
					</Link>
				</h1>
				<nav>
					<ul className="flex space-x-4">
						<li>
							<Link to="/" className="text-white hover:text-gray-200">
								Events
							</Link>
						</li>
						{isLoggedIn ? (
							<>
								<li>
									<Link
										to="/profile"
										className="text-white hover:text-gray-200"
									>
										Profile
									</Link>
								</li>
								{isAdmin && <li>
									<Link
										to="/admin"
										className="text-white hover:text-gray-200"
									>
										Dashboard
									</Link>
								</li>}
							</>
						) : (
							<>
								<li>
									<Link to="/login" className="text-white hover:text-gray-200">
										Login
									</Link>
								</li>
								<li>
									<Link
										to="/register"
										className="text-white hover:text-gray-200"
									>
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
