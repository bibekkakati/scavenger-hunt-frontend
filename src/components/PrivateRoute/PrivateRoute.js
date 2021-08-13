import { Redirect, Route } from "react-router-dom";
import user from "../../helpers/user";

function PrivateRoute({ children, ...rest }) {
	const isLoggedin = user.getAuthToken();
	return (
		<Route
			{...rest}
			render={() => {
				return isLoggedin ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
						}}
					/>
				);
			}}
		/>
	);
}

export default PrivateRoute;
