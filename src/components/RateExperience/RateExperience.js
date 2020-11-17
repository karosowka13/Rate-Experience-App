import React, { useState, useEffect } from "react"; // add {useCallback, useContext}
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Rating from "@material-ui/lab/Rating";

import logo from "../../images/LogoSouthTours--300x49.png";

import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

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
			South tours {new Date().getFullYear()}
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
		margin: theme.spacing(2, 0, 2),
		height: "2.7rem",
		backgroundColor: "#052049",
		color: "white",
		"&:hover": { backgroundColor: "#f48024" },
	},
	textfield: { borderColor: "#052049", "&:focus": { borderColor: "#052049" } },
	toolbar: { backgroundColor: "#052049" },
	select: { width: "100%" },
	formControl: { width: "100%" },
}));

function RateExperience() {
	const [getCommentData, setGetCommentData] = useState([
		{ isTokenUsed: "0", tourName: "" },
	]);
	const [mailSent, setmailSent] = useState(false);
	const [error, setError] = useState(null);

	const classes = useStyles();
	const countryList = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"American Samoa",
		"Andorra",
		"Angola",
		"Anguilla",
		"Antarctica",
		"Antigua and Barbuda",
		"Argentina",
		"Armenia",
		"Aruba",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas (the)",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bermuda",
		"Bhutan",
		"Bolivia (Plurinational State of)",
		"Bonaire, Sint Eustatius and Saba",
		"Bosnia and Herzegovina",
		"Botswana",
		"Bouvet Island",
		"Brazil",
		"British Indian Ocean Territory (the)",
		"Brunei Darussalam",
		"Bulgaria",
		"Burkina Faso",
		"Burundi",
		"Cabo Verde",
		"Cambodia",
		"Cameroon",
		"Canada",
		"Cayman Islands (the)",
		"Central African Republic (the)",
		"Chad",
		"Chile",
		"China",
		"Christmas Island",
		"Cocos (Keeling) Islands (the)",
		"Colombia",
		"Comoros (the)",
		"Congo (the Democratic Republic of the)",
		"Congo (the)",
		"Cook Islands (the)",
		"Costa Rica",
		"Croatia",
		"Cuba",
		"Curaçao",
		"Cyprus",
		"Czechia",
		"Côte d'Ivoire",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic (the)",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Eritrea",
		"Estonia",
		"Eswatini",
		"Ethiopia",
		"Falkland Islands (the) [Malvinas]",
		"Faroe Islands (the)",
		"Fiji",
		"Finland",
		"France",
		"French Guiana",
		"French Polynesia",
		"French Southern Territories (the)",
		"Gabon",
		"Gambia (the)",
		"Georgia",
		"Germany",
		"Ghana",
		"Gibraltar",
		"Greece",
		"Greenland",
		"Grenada",
		"Guadeloupe",
		"Guam",
		"Guatemala",
		"Guernsey",
		"Guinea",
		"Guinea-Bissau",
		"Guyana",
		"Haiti",
		"Heard Island and McDonald Islands",
		"Holy See (the)",
		"Honduras",
		"Hong Kong",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran (Islamic Republic of)",
		"Iraq",
		"Ireland",
		"Isle of Man",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Jersey",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kiribati",
		"Korea (the Democratic People's Republic of)",
		"Korea (the Republic of)",
		"Kuwait",
		"Kyrgyzstan",
		"Lao People's Democratic Republic (the)",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Macao",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Marshall Islands (the)",
		"Martinique",
		"Mauritania",
		"Mauritius",
		"Mayotte",
		"Mexico",
		"Micronesia (Federated States of)",
		"Moldova (the Republic of)",
		"Monaco",
		"Mongolia",
		"Montenegro",
		"Montserrat",
		"Morocco",
		"Mozambique",
		"Myanmar",
		"Namibia",
		"Nauru",
		"Nepal",
		"Netherlands (the)",
		"New Caledonia",
		"New Zealand",
		"Nicaragua",
		"Niger (the)",
		"Nigeria",
		"Niue",
		"Norfolk Island",
		"Northern Mariana Islands (the)",
		"Norway",
		"Oman",
		"Pakistan",
		"Palau",
		"Palestine, State of",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Philippines (the)",
		"Pitcairn",
		"Poland",
		"Portugal",
		"Puerto Rico",
		"Qatar",
		"Republic of North Macedonia",
		"Romania",
		"Russian Federation (the)",
		"Rwanda",
		"Réunion",
		"Saint Barthélemy",
		"Saint Helena, Ascension and Tristan da Cunha",
		"Saint Kitts and Nevis",
		"Saint Lucia",
		"Saint Martin (French part)",
		"Saint Pierre and Miquelon",
		"Saint Vincent and the Grenadines",
		"Samoa",
		"San Marino",
		"Sao Tome and Principe",
		"Saudi Arabia",
		"Senegal",
		"Serbia",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Sint Maarten (Dutch part)",
		"Slovakia",
		"Slovenia",
		"Solomon Islands",
		"Somalia",
		"South Africa",
		"South Georgia and the South Sandwich Islands",
		"South Sudan",
		"Spain",
		"Sri Lanka",
		"Sudan (the)",
		"Suriname",
		"Svalbard and Jan Mayen",
		"Sweden",
		"Switzerland",
		"Syrian Arab Republic",
		"Taiwan",
		"Tajikistan",
		"Tanzania, United Republic of",
		"Thailand",
		"Timor-Leste",
		"Togo",
		"Tokelau",
		"Tonga",
		"Trinidad and Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Turks and Caicos Islands (the)",
		"Tuvalu",
		"Uganda",
		"Ukraine",
		"United Arab Emirates (the)",
		"United Kingdom of Great Britain and Northern Ireland (the)",
		"United States Minor Outlying Islands (the)",
		"United States of America (the)",
		"Uruguay",
		"Uzbekistan",
		"Vanuatu",
		"Venezuela (Bolivarian Republic of)",
		"Viet Nam",
		"Virgin Islands (British)",
		"Virgin Islands (U.S.)",
		"Wallis and Futuna",
		"Western Sahara",
		"Yemen",
		"Zambia",
		"Zimbabwe",
		"Åland Islands",
	];
	const token = useParams();
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_GETREVIEW + "?token=" + token.id)
			.then((response) => setGetCommentData(response.data));
	}, [token]);

	const menuItem = countryList.map((countryName, index) => (
		<MenuItem key={index} value={countryName}>
			{countryName}
		</MenuItem>
	));

	let customerField = null;
	if (
		!mailSent &&
		!parseInt(getCommentData[0].isTokenUsed) &&
		getCommentData !== "not exist"
	) {
		customerField = (
			<React.Fragment>
				<Formik
					initialValues={{
						name: "",
						country: "",
						city: "",
						commentText: "",
						rating: 0,
						isTokenUsed: false,
					}}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						axios({
							method: "put",
							url: `${process.env.REACT_APP_SENDREVIEW}` + token.id,
							headers: { "content-type": "application/json" },
							data: values,
						})
							.then((result) => {
								if (result) {
									setmailSent(true);
									setError(false);
								} else {
									setError(true);
								}
							})
							.catch((error) => setError(error.message));
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string().required("Required"),
						country: Yup.string().required("Required"),
						commentText: Yup.string().required("Required"),
						rating: Yup.number().min(1).required("Required"),
						city: Yup.string(),
					})}
				>
					{(props) => {
						const {
							values,
							touched,
							errors,
							handleBlur,
							isSubmitting,
							handleChange,
							handleSubmit,
						} = props;
						return (
							<div className={classes.paper}>
								<form className={classes.form} onSubmit={handleSubmit}>
									<h1>Rate your {getCommentData[0].tourName}</h1>
									<Rating
										name="rating"
										value={parseInt(values.rating)}
										onChange={handleChange}
										onBlur={handleBlur}
										helpertext={
											errors.rating && touched.rating && errors.rating
										}
									/>
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										id="Name"
										label="Your name"
										name="name"
										autoComplete="Name"
										autoFocus
										className={classes.textfield}
										onChange={handleChange}
										value={values.name}
										onBlur={handleBlur}
										helpertext={errors.name && touched.name && errors.name}
									/>
									<FormControl
										variant="outlined"
										className={classes.formControl}
									>
										<InputLabel id="country">Your country</InputLabel>
										<Select
											labelId="country"
											value={values.country}
											onChange={handleChange}
											label="Your country"
											name="country"
											onBlur={handleBlur}
											helpertext={
												errors.country && touched.country && errors.country
											}
										>
											{menuItem}
										</Select>
									</FormControl>
									<TextField
										variant="outlined"
										margin="normal"
										fullWidth
										name="city"
										label="Your city"
										id="city"
										autoComplete="current-city"
										bordercolor="primary"
										onChange={handleChange}
										value={values.city}
										onBlur={handleBlur}
										helpertext={errors.city && touched.city && errors.city}
									/>

									<TextField
										multiline
										rows={4}
										variant="outlined"
										margin="normal"
										required
										fullWidth
										name="commentText"
										label="Your comment"
										id="comment"
										bordercolor="primary"
										onChange={handleChange}
										value={values.commentText}
										onBlur={handleBlur}
										helpertext={
											errors.commentText &&
											touched.commentText &&
											errors.commentText
										}
									/>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										className={classes.submit}
										disabled={isSubmitting}
										onClick={handleSubmit}
									>
										Rate the experience
									</Button>
								</form>
							</div>
						);
					}}
				</Formik>
			</React.Fragment>
		);
	} else if (mailSent) {
		customerField = (
			<div className={classes.messageContainer}>
				{" "}
				<h2>Thank you for your opinion. </h2>
			</div>
		);
	} else if (error) {
		customerField = (
			<div className={classes.messageContainer}>
				<h2>{error}. Please, try again.</h2>
			</div>
		);
	} else {
		customerField = (
			<React.Fragment>
				<Redirect to="/privacy-policy" />
			</React.Fragment>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<Toolbar className={classes.toolbar}>
				<a href="https://south.tours/">
					<img src={logo} alt="logo" />
				</a>
			</Toolbar>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				{customerField}
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default RateExperience;
