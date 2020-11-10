export const login = () => {
	window.localStorage.setItem("auth", true);
};

export const isAuthe = () => {
	if (window.localStorage.getItem("auth") == null) {
		return false;
	} else {
		return true;
	}
};

export const logout = () => {
	if (window.localStorage.getItem("auth") != null) {
		window.localStorage.removeItem("auth");
	}
};
