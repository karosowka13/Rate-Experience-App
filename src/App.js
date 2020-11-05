import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import RateExperience from "./components/RateExperience/RateExperience";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./Service/Authentication";
function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Switch>
					<Route exact path="/login" component={LoginForm} />
					<Route exact path="/rate-experience/:id" component={RateExperience} />
					<Redirect to="https://south.tours" />
					<ProtectedRoute exact to="/" component={Dashboard} />
				</Switch>
			</AuthProvider>
		</div>
	);
}

export default App;
