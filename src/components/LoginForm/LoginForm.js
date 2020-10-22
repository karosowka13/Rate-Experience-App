import React, { useCallback, useContext } from "react"; // add {useCallback, useContext}
import { Redirect } from "react-router-dom";
import app from "../../Service/firebase.js";
import { AuthContext } from "../../Service/Authentication.js";

import logo from "../../images/LogoSouthTours--300x49.png";

import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { createMuiTheme } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import "./LoginForm.module.css";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#052049",
		},
		secondary: {
			main: "#f48024",
		},
	},
});

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			South Tours {new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		height: "2.7rem",
		backgroundColor: "#052049",
		color: "white",
		"&:hover": { backgroundColor: "#f48024" },
	},
	textfield: { borderColor: "#052049", "&:focus": { borderColor: "#052049" } },
	toolbar: { backgroundColor: "#052049" },
}));

function LoginForm({ history }) {
	const classes = useStyles();

	const handleLogin = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await app
					.auth()
					.signInWithEmailAndPassword(email.value, password.value);
				history.push("/");
			} catch (error) {
				alert(error);
			}
		},
		[history]
	);

	const { currentUser } = useContext(AuthContext);
	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Toolbar className={classes.toolbar}>
				{" "}
				<img alt="logo" src={logo} />
			</Toolbar>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<form onSubmit={handleLogin} className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							className={classes.textfield}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							borderColor="primary"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							className={classes.submit}
						>
							Sign In
						</Button>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default LoginForm;
