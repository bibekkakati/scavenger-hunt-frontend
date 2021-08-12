const setAuthToken = (token) => {
	if (token) window.localStorage.setItem("token", token);
};

const getAuthToken = () => {
	return window.localStorage.getItem("token");
};

const setUserRole = (role) => {
	if (role) window.localStorage.setItem("role", role);
};

const getUserRole = () => {
	return window.localStorage.getItem("role");
};

const logoutUser = () => {
	window.localStorage.removeItem("token");
	window.localStorage.removeItem("role");
	window.location.replace("/");
};

const user = {
	setAuthToken,
	getAuthToken,
	setUserRole,
	getUserRole,
	logoutUser,
};

export default user;
