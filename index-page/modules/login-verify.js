import { getData } from "./helper-functions.js";

// detect if user passed login
if (!getData("activeUserID")) {
	document.location.href = "/log-in/login.html";
}

// logout logic
function logOut() {
	localStorage.removeItem("activeUserID");
	localStorage.removeItem("activeTeamIndex");
	location.assign("../../welcome-page/welcome.html");
}
$("#log-out").click(function () {
	logOut();
});
