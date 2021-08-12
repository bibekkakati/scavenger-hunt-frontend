import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthManager from "../apiManager/managers/authManager";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Layout from "../components/Layout/Layout";
import user from "../helpers/user";
import * as styles from "../styles/LoginPage.module.css";

export default function Loginpage() {
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		if (!username) return alert("Username is required.");
		if (!password) return alert("Password is required.");

		const [response, error] = await AuthManager.login({
			username,
			password,
		});
		if (error) return alert("Something went wrong.");
		if (response && response.success) {
			const { token, role } = response;
			if (token && role) {
				user.setAuthToken(token);
				user.setUserRole(role);
				// history.replace("/dashboard");
				return;
			}
		}
		return alert(response.message);
	};

	return (
		<Layout>
			<div className={styles.main}>
				<p className={styles.heading}>Get Into Your Account</p>
				<div className={styles.loginForm}>
					<Input
						value={username}
						onChange={setUsername}
						placeholder="Username"
					/>
					<Input
						value={password}
						onChange={setPassword}
						placeholder="Password"
					/>
					<Button label="Login" onClick={handleLogin} />
				</div>
			</div>
		</Layout>
	);
}
