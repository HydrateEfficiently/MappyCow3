define([
],
function () {
	return function (app) {
		app.factory("MapStateService", function ($rootScope) {
			var mapStateService = {};

			mapStateService.center = [51.5072, 0.1275];

			mapStateService.setCenter = function (lat, lng) {
				mapStateService.center = [lat, lng];
				$rootScope.$broadcast("mapCenterUpdated");
			};

			return mapStateService;
		});
	};
});