define([
	// Explicit
	"app",

	// Implicit
	"Services"
],
function (app) {
	app.controller("AppController", function ($scope, $location, OutletRequestService) {
		this.panelTitle = "Home";

		OutletRequestService.onOutletsRetrieved(function () {
			$location.path("filters");
		});
	});
});