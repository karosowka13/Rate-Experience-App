import React, { useState } from "react";
import "./LoginForm.module.css";

function loginForm() {
	// userData is an array
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const submitHandler = (event) => {};
	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className="container">
				<label htmlFor="username">Name</label>
				<input
					type="text"
					className="inputname"
					id="username"
					required
					value={username}
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
			</div>
			<div className="container">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					className="password"
					id="password"
					required
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
			</div>
			<input type="submit" value="Submit" />
		</form>
	);
}

export default loginForm;
