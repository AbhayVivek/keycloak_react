// // useAuth.js
// import { useState, useEffect, useRef, useCallback } from "react";
// import Keycloak from "keycloak-js";

// const client = new Keycloak({
// 	url: "http://localhost:8080/",
// 	realm: "NHAI",
// 	clientId: "frontend",
// });

// const useAuth = () => {
// 	const isRun = useRef(false);
// 	const [token, setToken] = useState(null);
// 	const [isAuthenticated, setIsAuthenticated] = useState(false);
// 	const [user, setUser] = useState(null);

// 	const initKeycloak = useCallback(() => {
// 		if (isRun.current) return;

// 		isRun.current = true;
// 		client
// 			.init({ onLoad: "login-required", checkLoginIframe: false })
// 			.then((authenticated) => {
// 				setIsAuthenticated(authenticated);
// 				if (authenticated) {
// 					setToken(client.token);

// 					client.loadUserProfile().then((profile) => {
// 						setUser(profile);
// 					});

// 					// Set up a token refresh timer
// 					client.onTokenExpired = () => {
// 						client
// 							.updateToken(30) // Refresh token if it will expire in less than 30 seconds
// 							.then((refreshed) => {
// 								if (refreshed) {
// 									setToken(client.token);
// 								}
// 							})
// 							.catch(() => {
// 								console.error(
// 									"Failed to refresh the token, or the session has expired"
// 								);
// 								setIsAuthenticated(false);
// 							});
// 					};
// 				}
// 			})
// 			.catch((error) => {
// 				console.error("Authentication failed", error);
// 				setIsAuthenticated(false);
// 			});
// 	}, []);

// 	useEffect(() => {
// 		initKeycloak();
// 	}, [initKeycloak]);

// 	const login = useCallback(() => {
// 		client.login();
// 	}, []);

// 	const logout = useCallback(() => {
// 		client.logout({ redirectUri: "http://localhost:3000/" });
// 	}, []);

// 	const hasRole = useCallback((roles) => {
// 		return roles.some((role) => client.hasRealmRole(role));
// 	}, []);

// 	return {
// 		isAuthenticated,
// 		token,
// 		user,
// 		login,
// 		logout,
// 		hasRole,
// 		keycloak: client,
// 	};
// };

// export default useAuth;

// useAuth.js
import { useState, useEffect, useRef, useCallback } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
	url: process.env.KEYCLOAK_URL,
	realm: "NHAI",
	clientId: "frontend",
});

const useAuth = () => {
	const isRun = useRef(false);
	const [token, setToken] = useState(null);
	const [refreshToken, setRefreshToken] = useState(null);
	const [idToken, setIdToken] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [roles, setRoles] = useState([]);

	const initKeycloak = useCallback(() => {
		if (isRun.current) return;

		isRun.current = true;
		client
			.init({ onLoad: "login-required", checkLoginIframe: false })
			.then((authenticated) => {
				setIsAuthenticated(authenticated);
				if (authenticated) {
					setToken(client.token);
					setRefreshToken(client.refreshToken);
					setIdToken(client.idToken);
					setUser(client.profile);
					setRoles(client.realmAccess?.roles || []);

					client.onTokenExpired = () => {
						client.updateToken(30).then((refreshed) => {
							if (refreshed) {
								setToken(client.token);
								setRefreshToken(client.refreshToken);
							}
						});
					};
				}
			})
			.catch((error) => {
				console.error("Authentication failed", error);
				setIsAuthenticated(false);
			});
	}, []);

	useEffect(() => {
		initKeycloak();
	}, [initKeycloak]);

	const login = useCallback(() => client.login(), []);
	const logout = useCallback(
		() => client.logout({ redirectUri: process.env.REACT_URL }),
		[]
	);
	const hasRole = useCallback(
		(roles) => roles.some((role) => client.hasRealmRole(role)),
		[]
	);

	return {
		isAuthenticated,
		token,
		refreshToken,
		idToken,
		user,
		roles,
		login,
		logout,
		hasRole,
		keycloak: client,
	};
};

export default useAuth;
