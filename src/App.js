// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { Button } from "primereact/button";
// import { Card } from "primereact/card";
// import useAuth from "./useAuth";
// import { httpClient } from "./HttpClient";

// const renderNestedObject = (data) => {
// 	if (typeof data === "object" && data !== null) {
// 		return (
// 			<div className="ml-4">
// 				{Object.entries(data).map(([key, value]) => (
// 					<div key={key} className="bg-gray-100 p-4 rounded-lg shadow-inner">
// 						<p className="font-semibold text-blue-600">{key}</p>
// 						<div className="text-gray-700">{renderNestedObject(value)}</div>
// 					</div>
// 				))}
// 			</div>
// 		);
// 	} else if (Array.isArray(data)) {
// 		return (
// 			<ul className="list-disc list-inside">
// 				{data.map((item, index) => (
// 					<li key={index}>{renderNestedObject(item)}</li>
// 				))}
// 			</ul>
// 		);
// 	} else {
// 		return <span>{data.toString()}</span>;
// 	}
// };

// function App() {
// 	const {
// 		isAuthenticated,
// 		token,
// 		refreshToken,
// 		idToken,
// 		user,
// 		roles,
// 		login,
// 		logout,
// 		hasRole,
// 		keycloak,
// 	} = useAuth();
// 	const [infoMessage, setInfoMessage] = useState("");
// 	const [profile, setProfile] = useState({});
// 	const [attr, setAttr] = useState({});

// 	useEffect(() => {
// 		if (token) {
// 			httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// 			console.log(keycloak);
// 		}
// 	}, [token]);

// 	const callBackend = () => {
// 		httpClient.get("https://mockbin.com/request");
// 	};

// 	const handleShowUserProfile = () => {
// 		keycloak.loadUserProfile().then((res) => {
// 			setProfile(res);

// 			if (res["attributes"]) {
// 				setAttr(res["attributes"]);
// 				console.log(res["attributes"], "attttt");
// 			}
// 		});
// 	};

// 	const handleShowAttributes = () => {
// 		setInfoMessage(JSON.stringify(attr, null, 2));
// 	};

// 	if (!isAuthenticated) {
// 		return <div>Loading or not authenticated...</div>;
// 	}

// 	return (
// 		<div className="min-h-screen bg-gray-100 flex flex-col">
// 			<header className="bg-blue-600 text-white py-4 shadow-md">
// 				<div className="container mx-auto px-4 flex justify-between items-center">
// 					<h1 className="text-2xl font-bold">NHAI keycloak - RBAC POC</h1>
// 					{user && (
// 						<span className="text-lg">
// 							Welcome, {user.firstName} {user.lastName}!
// 						</span>
// 					)}
// 				</div>
// 			</header>

// 			<div className="flex flex-grow">
// 				<aside className="w-1/4 bg-white shadow-md p-4">
// 					<div className="space-y-4">
// 						<Button
// 							onClick={handleShowUserProfile}
// 							className="w-full"
// 							label="Show User Profile"
// 							severity="info"
// 						/>
// 						<Button
// 							onClick={() => setInfoMessage(JSON.stringify(roles, null, 2))}
// 							className="w-full"
// 							label="Show User Roles"
// 							severity="warning"
// 						/>
// 						{/* <Button
// 							onClick={() => setInfoMessage(token)}
// 							className="w-full"
// 							label="Show Access Token"
// 							severity="success"
// 						/>
// 						<Button
// 							onClick={() => setInfoMessage(refreshToken)}
// 							className="w-full"
// 							label="Show Refresh Token"
// 							severity="success"
// 						/> */}
// 						<Button
// 							onClick={() => setInfoMessage(idToken)}
// 							className="w-full"
// 							label="Show ID Token"
// 							severity="success"
// 						/>
// 						{/* <Button
// 							onClick={callBackend}
// 							className="w-full"
// 							label="Send HTTP Request"
// 							severity="primary"
// 						/> */}
// 						<Button
// 							onClick={() => setInfoMessage(hasRole(["admin"]).toString())}
// 							className="w-full"
// 							label='Has realm role "Admin"'
// 							severity="info"
// 						/>
// 						<Button
// 							onClick={() =>
// 								setInfoMessage(hasRole(["uma_authorization"]).toString())
// 							}
// 							className="w-full"
// 							label='Has realm role "UMA Authorization"'
// 							severity="info"
// 						/>
// 						<Button
// 							onClick={handleShowAttributes}
// 							className="w-full"
// 							label="Show RBAC Data"
// 							severity="info"
// 						/>
// 						<Button
// 							onClick={logout}
// 							className="w-full"
// 							label="Logout"
// 							severity="danger"
// 						/>
// 					</div>
// 				</aside>

// 				<main className="flex-grow p-4">
// 					<Card className="p-4 bg-white shadow-md">
// 						<h2 className="text-xl font-semibold mb-4">Session Information</h2>
// 						<p className="mb-2">
// 							<strong>Session ID:</strong> {keycloak.tokenParsed.sid}
// 						</p>
// 						<p className="mb-2">
// 							<strong>Token Expiration:</strong>{" "}
// 							{new Date(keycloak.tokenParsed.exp * 1000).toLocaleString()}
// 						</p>
// 						<p className="mb-2">
// 							<strong>Token Issued At:</strong>{" "}
// 							{new Date(keycloak.tokenParsed.iat * 1000).toLocaleString()}
// 						</p>
// 						<p className="mb-2">
// 							<strong>Last Authentication:</strong>{" "}
// 							{new Date(keycloak.tokenParsed.auth_time * 1000).toLocaleString()}
// 						</p>

// 						<h2 className="text-xl font-semibold mt-6 mb-4">
// 							Token Information
// 						</h2>
// 						<pre
// 							style={{
// 								background: "lightblue",
// 								width: "1000px",
// 								height: "auto",
// 								textOverflow: "ellipsis",
// 							}}
// 							className=" text-wrap p-8 rounded "
// 						>
// 							{infoMessage}
// 						</pre>
// 						{Object.keys(profile).length === 0 ? (
// 							""
// 						) : (
// 							<div className="bg-white shadow-md rounded-lg p-6">
// 								<h2 className="text-xl font-bold mb-4">User Profile</h2>
// 								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 									{Object.entries(profile).map(([key, value]) => (
// 										<div
// 											key={key}
// 											className="bg-gray-100 p-4 rounded-lg shadow-inner"
// 										>
// 											<p className="font-semibold text-blue-600">{key}</p>
// 											<div className="text-gray-700">
// 												{renderNestedObject(value)}
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 						)}
// 						{Object.keys(attr).length === 0 ? (
// 							""
// 						) : (
// 							<div className="bg-white shadow-md rounded-lg p-6 mt-4">
// 								<h2 className="text-xl font-bold mb-4">Attributes</h2>
// 								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 									{Object.entries(attr).map(([key, value]) => (
// 										<div
// 											key={key}
// 											className="bg-gray-100 p-4 rounded-lg shadow-inner"
// 										>
// 											<p className="font-semibold text-blue-600">{key}</p>
// 											<div className="text-gray-700">
// 												{renderNestedObject(value)}
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 						)}
// 					</Card>
// 				</main>
// 			</div>

// 			<footer className="bg-gray-800 text-white py-4 mt-4">
// 				<div className="container mx-auto px-4 text-center">
// 					<p> RBAC POC.</p>
// 				</div>
// 			</footer>
// 		</div>
// 	);
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import useAuth from "./useAuth";
import { httpClient } from "./HttpClient";

const renderNestedObject = (data) => {
	if (typeof data === "object" && data !== null) {
		return (
			<div className="ml-4">
				{Object.entries(data).map(([key, value]) => (
					<div key={key} className="bg-gray-100 p-4 rounded-lg shadow-inner">
						<p className="font-semibold text-blue-600">{key}</p>
						<div className="text-gray-700">{renderNestedObject(value)}</div>
					</div>
				))}
			</div>
		);
	} else if (Array.isArray(data)) {
		return (
			<ul className="list-disc list-inside">
				{data.map((item, index) => (
					<li key={index}>{renderNestedObject(item)}</li>
				))}
			</ul>
		);
	} else {
		return <span>{data.toString()}</span>;
	}
};

function App() {
	const {
		isAuthenticated,
		token,
		refreshToken,
		idToken,
		user,
		roles,
		login,
		logout,
		hasRole,
		keycloak,
	} = useAuth();
	console.log(keycloak);
	const [infoMessage, setInfoMessage] = useState("");
	const [profile, setProfile] = useState({});
	const [attr, setAttr] = useState({});

	useEffect(() => {
		if (token && keycloak) {
			httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			console.log(keycloak);
		}
	}, [token, keycloak]);

	const callBackend = () => {
		httpClient
			.get("https://mockbin.com/request")
			.then((response) => {
				console.log(response);
				setInfoMessage(JSON.stringify(response.data, null, 2));
			})
			.catch((error) => {
				console.error("Error calling backend:", error);
				setInfoMessage("Error calling backend. Check console for details.");
			});
	};

	const handleShowUserProfile = () => {
		keycloak.loadUserProfile().then((res) => {
			setProfile(res);

			if (res.attributes) {
				setAttr(res.attributes);
				console.log(res.attributes, "attttt");
			}
		});
	};

	const handleShowAttributes = () => {
		setInfoMessage(JSON.stringify(attr, null, 2));
	};

	if (!isAuthenticated) {
		return <div>Loading or not authenticated...</div>;
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			<header className="bg-blue-600 text-white py-4 shadow-md">
				<div className="container mx-auto px-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">NHAI keycloak - RBAC POC</h1>
					{user && (
						<span className="text-lg">
							Welcome, {user.firstName} {user.lastName}!
						</span>
					)}
				</div>
			</header>

			<div className="flex flex-grow">
				<aside className="w-1/4 bg-white shadow-md p-4">
					<div className="space-y-4">
						<Button
							onClick={handleShowUserProfile}
							className="w-full"
							label="Show User Profile"
							severity="info"
						/>
						<Button
							onClick={() => setInfoMessage(JSON.stringify(roles, null, 2))}
							className="w-full"
							label="Show User Roles"
							severity="warning"
						/>
						<Button
							onClick={() => setInfoMessage(idToken)}
							className="w-full"
							label="Show ID Token"
							severity="success"
						/>
						<Button
							onClick={() => setInfoMessage(hasRole(["admin"]).toString())}
							className="w-full"
							label='Has realm role "Admin"'
							severity="info"
						/>
						<Button
							onClick={() =>
								setInfoMessage(hasRole(["uma_authorization"]).toString())
							}
							className="w-full"
							label='Has realm role "UMA Authorization"'
							severity="info"
						/>
						<Button
							onClick={handleShowAttributes}
							className="w-full"
							label="Show RBAC Data"
							severity="info"
						/>
						<Button
							onClick={logout}
							className="w-full"
							label="Logout"
							severity="danger"
						/>
					</div>
				</aside>

				<main className="flex-grow p-4">
					<Card className="p-4 bg-white shadow-md">
						<h2 className="text-xl font-semibold mb-4">Session Information</h2>
						{keycloak && keycloak.tokenParsed ? (
							<>
								<p className="mb-2">
									<strong>Session ID:</strong> {keycloak.tokenParsed.sid}
								</p>
								<p className="mb-2">
									<strong>Token Expiration:</strong>{" "}
									{new Date(keycloak.tokenParsed.exp * 1000).toLocaleString()}
								</p>
								<p className="mb-2">
									<strong>Token Issued At:</strong>{" "}
									{new Date(keycloak.tokenParsed.iat * 1000).toLocaleString()}
								</p>
								<p className="mb-2">
									<strong>Last Authentication:</strong>{" "}
									{new Date(
										keycloak.tokenParsed.auth_time * 1000
									).toLocaleString()}
								</p>
							</>
						) : (
							<p>Session information not available.</p>
						)}

						<h2 className="text-xl font-semibold mt-6 mb-4">
							Token Information
						</h2>
						<pre
							style={{
								background: "lightblue",
								width: "1000px",
								height: "auto",
								textOverflow: "ellipsis",
							}}
							className=" text-wrap p-8 rounded "
						>
							{infoMessage}
						</pre>
						{Object.keys(profile).length === 0 ? (
							<p>No user profile data available.</p>
						) : (
							<div className="bg-white shadow-md rounded-lg p-6">
								<h2 className="text-xl font-bold mb-4">User Profile</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{Object.entries(profile).map(([key, value]) => (
										<div
											key={key}
											className="bg-gray-100 p-4 rounded-lg shadow-inner"
										>
											<p className="font-semibold text-blue-600">{key}</p>
											<div className="text-gray-700">
												{renderNestedObject(value)}
											</div>
										</div>
									))}
								</div>
							</div>
						)}
						{Object.keys(attr).length === 0 ? (
							<p>No attributes available.</p>
						) : (
							<div className="bg-white shadow-md rounded-lg p-6 mt-4">
								<h2 className="text-xl font-bold mb-4">Attributes</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{Object.entries(attr).map(([key, value]) => (
										<div
											key={key}
											className="bg-gray-100 p-4 rounded-lg shadow-inner"
										>
											<p className="font-semibold text-blue-600">{key}</p>
											<div className="text-gray-700">
												{renderNestedObject(value)}
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</Card>
				</main>
			</div>

			<footer className="bg-gray-800 text-white py-4 mt-4">
				<div className="container mx-auto px-4 text-center">
					<p> RBAC POC.</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
