define([
	"app"
],
function (app) {
	app.factory("LocationService", function ($rootScope) {
		var locationService = {};

		locationService.location = null;

		locationService.hasLocation = function () {
			return locationService.location !== null;
		};

		locationService.requestLocation = function () {
			$rootScope.$broadcast("locationRequested");
		};

		locationService.locationFound = function (lat, lng) {
			locationService.location = [lat, lng];
			$rootScope.$broadcast("locationFound");
		};

		return locationService;
	});
});