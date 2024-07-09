import Keycloak from "keycloak-js";

let initOptions = {
	url: "http://localhost:8080/",
	realm: "NHAI",
	clientId: "frontend",
};
let isInitialized = false;

const _kc = new Keycloak(initOptions);

const initKeycloak = (onAuthenticatedCallback) => {
	if (!isInitialized) {
		_kc
			.init({
				onLoad: "check-sso",
				silentCheckSsoRedirectUri:
					window.location.origin + "/silent-check-sso.html",
				pkceMethod: "S256",
			})
			.then((authenticated) => {
				if (!authenticated) {
					console.log("user is not authenticated..!");
				}
				onAuthenticatedCallback();
			})
			.catch(console.error);
	}
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
	_kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
	initKeycloak,
	doLogin,
	doLogout,
	isLoggedIn,
	getToken,
	getTokenParsed,
	updateToken,
	getUsername,
	hasRole,
};

export default UserService;