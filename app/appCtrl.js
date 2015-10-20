define([
	// Explicit
	"app",

	// Implicit
	"Services"
],
function (app) {
	app.controller("AppController", function ($scope, $location, OutletService) {
		this.panelTitle = "Home";

		OutletService.onOutletsFound(function () {
			$location.path("filters");
		});
	});
});