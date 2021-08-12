import { post } from "../apiClient";

const login = (data) => {
	return post(`/auth/login`, data);
};

const AuthManager = {
	login,
};

export default AuthManager;
