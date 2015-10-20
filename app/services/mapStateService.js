define([
	"app",
	"angular"
],
function (app, angular) {
	app.factory("MapStateService", function ($rootScope, $timeout, LocationService) {
		var mapStateService = {},
			onCenterChangedCallbacks = [];

		if (LocationService.hasLocation()) {
			mapStateService.center = LocationService.location;
		} else {
			mapStateService.center = [51.5072, 0.1275];
		}

		mapStateService.setCenter = function (lat, lng) {
			mapStateService.center = [lat, lng];
			angular.forEach(onCenterChangedCallbacks, function (callback) {
				$timeout(function () {
					callback(mapStateService.center);
				}, 0);
			});
		};

		mapStateService.onCenterChanged = function (callback) {
			onCenterChangedCallbacks.push(callback);
		};

		return mapStateService;
	});
});