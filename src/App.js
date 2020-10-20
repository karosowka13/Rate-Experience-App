import React, { useState } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import "./App.css";
import loginForm from "./components/LoginForm/LoginForm";

function App() {
	let secureRoutes = (
		<React.Fragment>
			<Switch>
				<Route path="/" component={loginForm} />
				<Route path="/logout" component={Logout} />
				<Redirect to="/" />
			</Switch>
		</React.Fragment>
	);
	if (props.isAuth) {
		secureRoutes = (
			<React.Fragment>
				<Switch>
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/" component={sendMail} />
					<Redirect to="/" />
				</Switch>
			</React.Fragment>
		);
	}
	return <div className="App">{secureRoutes}</div>;
}

export default App;
