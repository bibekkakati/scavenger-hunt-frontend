import { Redirect, Route } from "react-router-dom";
import user from "../../helpers/user";

function PrivateRoute({ component: Component, ...rest }) {
	const isLoggedin = user.getAuthToken();
	return (
		<Route
			{...rest}
			render={(props) => {
				return isLoggedin ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}
		/>
	);
}

export default PrivateRoute;
