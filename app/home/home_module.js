define([
	"require",
	"home/home_ctrl"
],
function (require, homeController) {

	var C_HOME_CONTROLLER = "HomeController";

	return function (app) {
		homeController(app, C_HOME_CONTROLLER);
		return {
			path: "/home",
			route: {
				templateUrl: require.toUrl("home/home.html"),
				controller: C_HOME_CONTROLLER
			}
		};
	};
});