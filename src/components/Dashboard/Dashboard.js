import React from "react";
import app from "../../Service/firebase";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import logo from "../../images/LogoSouthTours--300x49.png";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		color: "white",
		position: "absolute",
		right: "3px",
	},
	title: {
		flexGrow: 1,
	},
	toolbar: { backgroundColor: "#052049" },
	submit: {
		margin: theme.spacing(3, 0, 2),
		height: "2.7rem",
		backgroundColor: "#052049",
		color: "white",
		"&:hover": { backgroundColor: "#f48024" },
	},
}));
export default function ButtonAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					></IconButton>
					<img src={logo} alt="logo" />
					<Button
						className={classes.menuButton}
						onClick={() => app.auth().signOut()}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Button className={classes.submit}>Send mails</Button>
		</div>
	);
}
