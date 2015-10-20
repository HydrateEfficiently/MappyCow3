define([
],
function () {
	return function (app) {
		app.factory("MapStateService", function ($rootScope, LocationService) {
			var mapStateService = {};

			if (LocationService.hasLocation()) {
				mapStateService.center = LocationService.location;
			} else {
				mapStateService.center = [51.5072, 0.1275];
			}

			mapStateService.setCenter = function (lat, lng) {
				mapStateService.center = [lat, lng];
				$rootScope.$broadcast("mapCenterUpdated");
			};

			return mapStateService;
		});
	};
});