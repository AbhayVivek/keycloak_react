// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Admin = () => {
// 	const [users, setUsers] = useState([]);
// 	const [selectedUser, setSelectedUser] = useState(null);
// 	const [roles, setRoles] = useState([]);

// 	useEffect(() => {
// 		fetchUsers();
// 		fetchRoles();
// 	}, []);

// 	const fetchUsers = async () => {
// 		try {
// 			const response = await axios.get("http://localhost:4000/users");
// 			setUsers(response.data);
// 		} catch (error) {
// 			console.error("Error fetching users", error);
// 		}
// 	};

// 	const fetchRoles = async () => {
// 		try {
// 			const response = await axios.get("http://localhost:4000/roles");
// 			setRoles(response.data);
// 		} catch (error) {
// 			console.error("Error fetching roles", error);
// 		}
// 	};

// 	const handleUserClick = async (user) => {
// 		try {
// 			const response = await axios.get(
// 				`http://localhost:4000/users/${user.id}/attributes`
// 			);
// 			const userDetails = { ...user, attributes: response.data };
// 			setSelectedUser(userDetails);
// 		} catch (error) {
// 			console.error("Error fetching user details", error);
// 		}
// 	};

// 	const handleAddUser = async () => {
// 		const newUser = { username: "New User", email: "newuser@example.com" }; // Replace with a form input later
// 		try {
// 			const response = await axios.post("http://localhost:4000/users", newUser);
// 			setUsers([...users, response.data]);
// 		} catch (error) {
// 			console.error("Error adding user", error);
// 		}
// 	};

// 	const handleUpdateUser = async (userData) => {
// 		try {
// 			await axios.put(`http://localhost:4000/users/${userData.id}`, userData);
// 			await axios.put(`http://localhost:4000/users/${userData.id}/attributes`, {
// 				attributes: userData.attributes,
// 			});
// 			fetchUsers();
// 		} catch (error) {
// 			console.error("Error updating user", error);
// 		}
// 	};

// 	return (
// 		<div className="flex h-screen">
// 			<div className="w-1/4 bg-gray-800 text-white p-4">
// 				<button
// 					onClick={handleAddUser}
// 					className="bg-blue-500 px-4 py-2 rounded mb-4"
// 				>
// 					Add User
// 				</button>
// 				<ul>
// 					{users.map((user) => (
// 						<li
// 							key={user.id}
// 							onClick={() => handleUserClick(user)}
// 							className="cursor-pointer py-2"
// 						>
// 							{user.username}
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 			<div className="w-3/4 p-4">
// 				{selectedUser ? (
// 					<UserForm
// 						user={selectedUser}
// 						onUpdateUser={handleUpdateUser}
// 						roles={roles}
// 					/>
// 				) : (
// 					<p>Select a user to view details</p>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// const UserForm = ({ user, onUpdateUser, roles }) => {
// 	const [userData, setUserData] = useState(user);
// 	const [newAttribute, setNewAttribute] = useState({ key: "", value: "" });

// 	useEffect(() => {
// 		setUserData(user);
// 	}, [user]);

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setUserData({ ...userData, [name]: value });
// 	};

// 	const handleAttributeChange = (e) => {
// 		const { name, value } = e.target;
// 		setUserData({
// 			...userData,
// 			attributes: { ...userData.attributes, [name]: value },
// 		});
// 	};

// 	const handleAddAttribute = () => {
// 		if (newAttribute.key && newAttribute.value) {
// 			setUserData({
// 				...userData,
// 				attributes: {
// 					...userData.attributes,
// 					[newAttribute.key]: newAttribute.value,
// 				},
// 			});
// 			setNewAttribute({ key: "", value: "" });
// 		}
// 	};

// 	const handleRemoveAttribute = (key) => {
// 		const { [key]: _, ...remainingAttributes } = userData.attributes;
// 		setUserData({ ...userData, attributes: remainingAttributes });
// 	};

// 	const handleRoleChange = (role, isChecked) => {
// 		if (isChecked) {
// 			setUserData({
// 				...userData,
// 				roles: [...(userData.roles || []), role],
// 			});
// 		} else {
// 			setUserData({
// 				...userData,
// 				roles: (userData.roles || []).filter((r) => r !== role),
// 			});
// 		}
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		onUpdateUser(userData);
// 	};

// 	return (
// 		<form onSubmit={handleSubmit} className="space-y-4">
// 			<div>
// 				<label className="block">Username</label>
// 				<input
// 					type="text"
// 					name="username"
// 					value={userData.username}
// 					onChange={handleChange}
// 					className="w-full p-2 border rounded"
// 				/>
// 			</div>
// 			<div>
// 				<label className="block">Email</label>
// 				<input
// 					type="email"
// 					name="email"
// 					value={userData.email}
// 					onChange={handleChange}
// 					className="w-full p-2 border rounded"
// 				/>
// 			</div>
// 			<div>
// 				<label className="block">Attributes</label>
// 				{Object.keys(userData.attributes || {}).map((key) => (
// 					<div key={key} className="flex items-center space-x-2">
// 						<input
// 							type="text"
// 							name={key}
// 							value={userData.attributes[key]}
// 							onChange={handleAttributeChange}
// 							className="w-full p-2 border rounded"
// 						/>
// 						<button
// 							type="button"
// 							onClick={() => handleRemoveAttribute(key)}
// 							className="bg-red-500 px-2 py-1 rounded text-white"
// 						>
// 							Remove
// 						</button>
// 					</div>
// 				))}
// 				<div className="flex items-center space-x-2 mt-2">
// 					<input
// 						type="text"
// 						placeholder="Key"
// 						value={newAttribute.key}
// 						onChange={(e) =>
// 							setNewAttribute({ ...newAttribute, key: e.target.value })
// 						}
// 						className="w-full p-2 border rounded"
// 					/>
// 					<input
// 						type="text"
// 						placeholder="Value"
// 						value={newAttribute.value}
// 						onChange={(e) =>
// 							setNewAttribute({ ...newAttribute, value: e.target.value })
// 						}
// 						className="w-full p-2 border rounded"
// 					/>
// 					<button
// 						type="button"
// 						onClick={handleAddAttribute}
// 						className="bg-green-500 px-2 py-1 rounded text-white"
// 					>
// 						Add
// 					</button>
// 				</div>
// 			</div>
// 			<div>
// 				<label className="block">Roles</label>
// 				<ul>
// 					{roles.map((role) => (
// 						<li key={role.id} className="flex items-center space-x-2">
// 							<input
// 								type="checkbox"
// 								checked={userData.roles?.includes(role.name)}
// 								onChange={(e) => handleRoleChange(role.name, e.target.checked)}
// 							/>
// 							<span>{role.name}</span>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 			<button type="submit" className="bg-green-500 px-4 py-2 rounded">
// 				Update User
// 			</button>
// 		</form>
// 	);
// };

// export default Admin;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [roles, setRoles] = useState([]);

	const [FormState, setFormState] = useState("addnew");

	useEffect(() => {
		fetchUsers();
		// fetchRoles();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await axios.get("http://localhost:4000/users");
			setUsers(response.data);
		} catch (error) {
			console.error("Error fetching users", error);
		}
	};

	const fetchRoles = async (id) => {
		try {
			const response = await axios.get(
				`http://localhost:4000/users/${id}/roles/realm`
			);
			setRoles(response.data);
		} catch (error) {
			console.error("Error fetching roles", error);
		}
	};

	const handleUserClick = async (user) => {
		try {
			const response = await axios.get(
				`http://localhost:4000/users/${user.id}/attributes`
			);
			const userDetails = { ...user, attributes: response.data };
			setSelectedUser(userDetails);
			fetchRoles(user.id);
			if (FormState === "addnew") {
				setFormState("edituser");
			} else if (FormState === "edituser") {
				setFormState("addnew");
			}
		} catch (error) {
			console.error("Error fetching user details", error);
		}
	};

	const handleAddUser = async () => {
		const newUser = { username: "New_User", email: "newuser@example.com" };
		try {
			const response = await axios.post("http://localhost:4000/users", newUser);
			setUsers([...users, response.data]);
			setFormState("addnew");
		} catch (error) {
			console.error("Error adding user", error);
		}
	};

	const handleUpdateUser = async (userData) => {
		try {
			await axios.put(`http://localhost:4000/users/${userData.id}`, userData);
			await axios.put(`http://localhost:4000/users/${userData.id}/attributes`, {
				attributes: userData.attributes,
			});
			fetchUsers();
		} catch (error) {
			console.error("Error updating user", error);
		}
	};

	const handleAddRole = async (roleName) => {
		try {
			const response = await axios.post(
				`http://localhost:4000/users/${selectedUser.id}/roles/realm`,
				{
					roleName: roleName,
				}
			);
			setRoles([...roles, response.data]);
		} catch (error) {
			console.error("Error adding role", error);
		}
	};

	return (
		<div className="flex h-screen">
			<div className="w-1/4 bg-gray-800 text-white p-4">
				<button
					onClick={handleAddUser}
					className="bg-blue-500 px-4 py-2 rounded mb-4"
				>
					Add User
				</button>
				<ul>
					{users.map((user) => (
						<li
							key={user.id}
							onClick={() => handleUserClick(user)}
							className="cursor-pointer py-2"
						>
							{user.username}
						</li>
					))}
				</ul>
			</div>
			<div className="w-3/4 p-4">
				{selectedUser ? (
					<UserForm
						user={selectedUser}
						onUpdateUser={handleUpdateUser}
						roles={roles}
						onAddRole={handleAddRole}
						FormState={FormState}
						setFormState={setFormState}
					/>
				) : (
					<p>Select a user to view details</p>
				)}
			</div>
		</div>
	);
};

const UserForm = ({
	user,
	onUpdateUser,
	roles,
	onAddRole,
	FormState,
	setFormState,
}) => {
	const [userData, setUserData] = useState(user);
	const [newAttribute, setNewAttribute] = useState({ key: "", value: "" });
	const [newRole, setNewRole] = useState("");

	useEffect(() => {
		setUserData(user);
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleAttributeChange = (key, value) => {
		setUserData({
			...userData,
			attributes: { ...userData.attributes, [key]: value },
		});
	};

	const handleAddAttribute = () => {
		if (newAttribute.key && newAttribute.value) {
			setUserData({
				...userData,
				attributes: {
					...userData.attributes,
					[newAttribute.key]: newAttribute.value,
				},
			});
			setNewAttribute({ key: "", value: "" });
		}
	};

	const handleRemoveAttribute = (key) => {
		const { [key]: _, ...remainingAttributes } = userData.attributes;
		setUserData({ ...userData, attributes: remainingAttributes });
	};

	const handleRoleChange = (role, isChecked) => {
		if (isChecked) {
			setUserData({
				...userData,
				roles: [...(userData.roles || []), role],
			});
		} else {
			setUserData({
				...userData,
				roles: (userData.roles || []).filter((r) => r !== role),
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onUpdateUser(userData);
	};

	const handleAddNewRole = () => {
		if (newRole) {
			onAddRole(newRole);
			setNewRole("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{FormState === "addnew" ? (
				<>
					<div>
						<h1>Create new user</h1>
						<label className="block">Username</label>
						<input
							type="text"
							name="username"
							value={userData.username}
							onChange={handleChange}
							className="w-full p-2 border rounded"
						/>
					</div>
					<div>
						<label className="block">Attributes</label>
						{Object.entries(userData.attributes || {}).map(([key, value]) => (
							<div key={key} className="flex items-center space-x-2 mb-2">
								<input
									type="text"
									value={key}
									readOnly
									className="w-1/3 p-2 border rounded bg-gray-100"
								/>
								<input
									type="text"
									value={value}
									onChange={(e) => handleAttributeChange(key, e.target.value)}
									className="w-2/3 p-2 border rounded"
								/>
								<button
									type="button"
									onClick={() => handleRemoveAttribute(key)}
									className="bg-red-500 px-2 py-1 rounded text-white"
								>
									Remove
								</button>
							</div>
						))}
						<div className="flex items-center space-x-2 mt-2">
							<input
								type="text"
								placeholder="Key"
								value={newAttribute.key}
								onChange={(e) =>
									setNewAttribute({ ...newAttribute, key: e.target.value })
								}
								className="w-1/3 p-2 border rounded"
							/>
							<input
								type="text"
								placeholder="Value"
								value={newAttribute.value}
								onChange={(e) =>
									setNewAttribute({ ...newAttribute, value: e.target.value })
								}
								className="w-2/3 p-2 border rounded"
							/>
							<button
								type="button"
								onClick={handleAddAttribute}
								className="bg-green-500 px-2 py-1 rounded text-white"
							>
								Add
							</button>
						</div>
					</div>
					<div>
						<label className="block">Roles</label>
						<ul>
							{roles.map((role) => (
								<li key={role.id} className="flex items-center space-x-2">
									<input
										type="checkbox"
										checked={userData.roles?.includes(role.name)}
										onChange={(e) =>
											handleRoleChange(role.name, e.target.checked)
										}
									/>
									<span>{role.name}</span>
								</li>
							))}
						</ul>
						<div className="flex items-center space-x-2 mt-2">
							<input
								type="text"
								placeholder="New Role"
								value={newRole}
								onChange={(e) => setNewRole(e.target.value)}
								className="w-full p-2 border rounded"
							/>
							<button
								type="button"
								onClick={handleAddNewRole}
								className="bg-blue-500 px-2 py-1 rounded text-white"
							>
								Add Role
							</button>
						</div>
					</div>
					<button type="submit" className="bg-green-500 px-4 py-2 rounded">
						Update User
					</button>
				</>
			) : (
				<>
					<div>
						<h1>Add new user</h1>
						<label className="block">Username</label>
						<input
							type="text"
							name="username"
							value={userData.username}
							onChange={handleChange}
							className="w-full p-2 border rounded"
						/>
					</div>
					<div>
						<label className="block">Attributes</label>
						{Object.entries(userData.attributes || {}).map(([key, value]) => (
							<div key={key} className="flex items-center space-x-2 mb-2">
								<input
									type="text"
									value={key}
									readOnly
									className="w-1/3 p-2 border rounded bg-gray-100"
								/>
								<input
									type="text"
									value={value}
									onChange={(e) => handleAttributeChange(key, e.target.value)}
									className="w-2/3 p-2 border rounded"
								/>
								<button
									type="button"
									onClick={() => handleRemoveAttribute(key)}
									className="bg-red-500 px-2 py-1 rounded text-white"
								>
									Remove
								</button>
							</div>
						))}
						<div className="flex items-center space-x-2 mt-2">
							<input
								type="text"
								placeholder="Key"
								value={newAttribute.key}
								onChange={(e) =>
									setNewAttribute({ ...newAttribute, key: e.target.value })
								}
								className="w-1/3 p-2 border rounded"
							/>
							<input
								type="text"
								placeholder="Value"
								value={newAttribute.value}
								onChange={(e) =>
									setNewAttribute({ ...newAttribute, value: e.target.value })
								}
								className="w-2/3 p-2 border rounded"
							/>
							<button
								type="button"
								onClick={handleAddAttribute}
								className="bg-green-500 px-2 py-1 rounded text-white"
							>
								Add
							</button>
						</div>
					</div>
					<div>
						<label className="block">Roles</label>
						<ul>
							{roles.map((role) => (
								<li key={role.id} className="flex items-center space-x-2">
									<input
										type="checkbox"
										checked={userData.roles?.includes(role.name)}
										onChange={(e) =>
											handleRoleChange(role.name, e.target.checked)
										}
									/>
									<span>{role.name}</span>
								</li>
							))}
						</ul>
						<div className="flex items-center space-x-2 mt-2">
							<input
								type="text"
								placeholder="New Role"
								value={newRole}
								onChange={(e) => setNewRole(e.target.value)}
								className="w-full p-2 border rounded"
							/>
							<button
								type="button"
								onClick={handleAddNewRole}
								className="bg-blue-500 px-2 py-1 rounded text-white"
							>
								Add Role
							</button>
						</div>
					</div>
					<button type="submit" className="bg-green-500 px-4 py-2 rounded">
						Update User
					</button>
				</>
			)}
		</form>
	);
};

export default Admin;
