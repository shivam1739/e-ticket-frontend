import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

/**
 * AdminRoute component to protect admin routes.
 * @param {object} props
 * @param {React.Component} props.element - The component to render if authorized.
 * @returns {React.Component}
 */

const AdminRoute = ({ element }) => {
	if (!isAuthenticated()) {

		return <Navigate to="/login" />;
	}

	const admin = getUserRole();
	if (!admin) {
		return <Navigate to="/" />;
	}

	return element;
};

export default AdminRoute;
