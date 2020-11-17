/* eslint-disable no-useless-computed-key */
import React, { useState, useEffect } from "react";
import app from "../../Service/firebase";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
		display: "grid",
		gridTemplateColumns: "230px 230px 1fr 1fr",
		gridTemplateRows: " 56px",
		justifyContent: "start",
		columnGap: "10px",
		margin: "0 auto",
		paddingTop: "10px",
		["@media (max-width:750px)"]: {
			width: "90%",
			display: "flex",
			flexDirection: "row",
			flexWrap: "nowrap",
			justifyContent: "flex-start",
		},
		["@media (max-width:590px)"]: {
			flexDirection: "column",
		},
	},
	submit: {
		gridArea: "button",
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
		gridArea: "send",
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
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			South tours {new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default function ButtonAppBar() {
	const [mailingList, setMailingList] = useState([
		{ mail: "", tour: "", postID: "" },
	]);
	const [toursList, setTourList] = useState([]);
	const [mailSent, setmailSent] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_GETTOURLIST)
			.then((response) => setTourList(response.data));
	}, []);

	let menuItem = "There are no tour list.";
	if (toursList.length > 0) {
		menuItem = toursList.map((tourName, index) => (
			<MenuItem key={index} value={tourName}>
				{tourName.post_title}
			</MenuItem>
		));
	}

	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...mailingList];
		if (name === "tour") {
			list[index]["postID"] = value.PostID;
			list[index]["tour"] = value.post_title;
			setMailingList(list);
		} else list[index][name] = value;
		setMailingList(list);
	};

	const handleRemove = (index) => {
		const list = [...mailingList];
		list.splice(index, 1);
		setMailingList(list);
	};

	const handleAdd = () => {
		setMailingList([...mailingList, { mail: "", tour: "", postID: null }]);
	};

	const sendMail = (e) => {
		e.preventDefault();
		setLoading(true);
		axios({
			method: "post",
			url: `${process.env.REACT_APP_SENDMAIL}`,
			headers: { "content-type": "application/json" },
			data: mailingList,
		})
			.then((result) => {
				if (result) {
					setLoading(false);
					setmailSent("MAILS HAS BEEN SENT SUCCESSFULLY");
				} else {
					setLoading(false);
					setError("Error appear");
				}
			})
			.catch((error) => setError(error.message));
	};
	let sendMailForm = null;
	if (loading) {
		sendMailForm = <Spinner />;
	} else if (error) {
		sendMailForm = <h2>{error}</h2>;
	} else if (mailSent) {
		sendMailForm = (
			<React.Fragment>
				<h2>{mailSent}</h2>{" "}
				<Button
					className={classes.submit}
					onClick={() => window.location.reload(false)}
				>
					Send new mails
				</Button>
			</React.Fragment>
		);
	} else {
		if (toursList.length > 0) {
			sendMailForm = mailingList.map((value, i) => {
				return (
					<ThemeProvider key={i} theme={theme}>
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
									value={value.tour.post_title}
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
									<React.Fragment>
										<Button className={classes.submit} onClick={handleAdd}>
											Add
										</Button>
										<Button className={classes.sendMail} onClick={sendMail}>
											Send mails
										</Button>
									</React.Fragment>
								)}
							</div>
						</div>
					</ThemeProvider>
				);
			});
		}
	}
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
					<a href="https://south.tours/">
						<img src={logo} alt="logo" />
					</a>
					<Button
						className={classes.menuButton}
						onClick={() => app.auth().signOut()}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			{sendMailForm}
			<div className="Copyright">
				<Copyright />
			</div>
		</div>
	);
}
