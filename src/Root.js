import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";

function Root() {
	return (
		<div>
			<header className="bg-blue-600 text-white py-4 shadow-md flex justify-between items-center px-4">
				<div className="container mx-auto px-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">NHAI keycloak - RBAC POC</h1>
					{/* {user && (
						<span className="text-lg">
							Welcome, {user.firstName} {user.lastName}!
						</span>
					)} */}
				</div>
				<nav>
					<ul className="flex flex-nowrap justify-between mx-3 items-center">
						<li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
							<Link to="/">Home</Link>
						</li>
						<li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
							<Link to="/sys-admin">Sys-Admin</Link>
						</li>
					</ul>
				</nav>
			</header>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/sys-admin" element={<Admin />} />
			</Routes>
		</div>
	);
}

export default Root;
