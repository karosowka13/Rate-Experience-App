/* eslint-disable no-useless-computed-key */
import React, { useState } from "react";
import app from "../../Service/firebase";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

import logo from "../../images/LogoSouthTours--300x49.png";

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
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		color: "white",
		position: "absolute",
		right: "3px",
	},
	title: {
		flexGrow: 1,
	},
	toolbar: { backgroundColor: "#052049" },
	inputBox: {
		width: "50%",
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
		justifyContent: "flex-start",
		margin: "0 auto",
		paddingTop: "15px",
		["@media (max-width:750px)"]: {
			width: "90%",
		},
		["@media (max-width:590px)"]: {
			flexDirection: "column",
		},
	},
	submit: {
		height: "56px",
		backgroundColor: "#052049",
		color: "white",
		"&:hover": { backgroundColor: "#f48024" },
		margin: "16px 4px 8px 4px",
		["@media (max-width:590px)"]: {
			width: "100%",
		},
	},
	sendMail: {
		height: "56px",
		backgroundColor: "#052049",
		color: "white",
		"&:hover": { backgroundColor: "#f48024" },
		margin: "16px 4px 8px 4px",
		padding: "0 96px",
		alignSelf: "start",
		["@media (max-width:590px)"]: {
			width: "90.4%",
		},
	},
	selectInput: {
		minWidth: "230px",
		margin: "16px 4px 8px 4px",
		["@media (max-width:590px)"]: {
			width: "100%",
			margin: "0",
		},
	},
}));

export default function ButtonAppBar() {
	const [mailingList, setMailingList] = useState([{ mail: "", tour: "" }]);
	const classes = useStyles();
	const tourList = [
		"Malaga Pub Crawl",
		"Granada Tapas Tour",
		"Sevilla Free Walking Tour",
	];
	const menuItem = tourList.map((tourName, index) => (
		<MenuItem key={index} value={tourName}>
			{tourName}
		</MenuItem>
	));

	const handleInputChange = (e, index) => {
		console.log(e.target);
		const { name, value } = e.target;
		const list = [...mailingList];
		list[index][name] = value;
		setMailingList(list);
	};

	const handleRemove = (index) => {
		const list = [...mailingList];
		list.splice(index, 1);
		setMailingList(list);
	};

	const handleAdd = () => {
		setMailingList([...mailingList, { mail: "", tour: "" }]);
	};

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
			{mailingList.map((value, i) => {
				return (
					<ThemeProvider theme={theme}>
						<div className={classes.inputBox}>
							<TextField
								variant="outlined"
								margin="normal"
								name="mail"
								label="Mail"
								type="mail"
								value={value.mail}
								required
								onChange={(e) => handleInputChange(e, i)}
							/>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel id="outlined-label">Tour type</InputLabel>
								<Select
									className={classes.selectInput}
									labelId="outlined-label"
									value={value.tour}
									onChange={(e) => handleInputChange(e, i)}
									label="Tour type"
									name="tour"
								>
									{menuItem}
								</Select>
							</FormControl>
							<div className={classes.buttonContainer}>
								{mailingList.length !== 1 && (
									<Button
										className={classes.submit}
										onClick={() => handleRemove(i)}
									>
										Remove
									</Button>
								)}
								{mailingList.length - 1 === i && (
									<Button className={classes.submit} onClick={handleAdd}>
										Add
									</Button>
								)}
							</div>
						</div>
					</ThemeProvider>
				);
			})}

			<Button className={classes.sendMail}>Send mails</Button>
		</div>
	);
}
