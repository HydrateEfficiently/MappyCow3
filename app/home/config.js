define([
	"require"
],
function (require) {
	return {
		path: "/home",
		templateUrl: require.toUrl("home/home.html"),
		controller: "HomeController",
		controllerAs: "home"
	};
});