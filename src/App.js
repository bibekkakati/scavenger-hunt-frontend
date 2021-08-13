import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
import Loginpage from "./pages/LoginPage";
import SearchBranchPage from "./pages/SearchBranchPage";

function App() {
	return (
		<main>
			<Switch>
				<Route exact path="/" component={SearchBranchPage} />
				<Route exact path="/search" component={SearchBranchPage} />
				<Route exact path="/login" component={Loginpage} />
				<PrivateRoute
					exact
					path="/dashboard"
					component={DashboardPage}
				/>
			</Switch>
		</main>
	);
}

export default App;
