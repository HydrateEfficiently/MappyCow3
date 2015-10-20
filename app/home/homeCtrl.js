define([
	"Services"
],
function () {
	return function (app, controllerName) {
		app.controller(controllerName, function ($scope, OutletService, MapStateService) {
			var home = this;

			home.getOutlets = function () {
				var center = MapStateService.center;
				OutletService.getOutlets(center[0], center[1]);
			};

			$scope.$on("mapCenterUpdated", function () {
				updateCenter();
				$scope.$apply();
			});

			function updateCenter() {
				var center = MapStateService.center;
				home.center = "Lat: " + center[0] + ", Lng: " + center[1];
			}

			updateCenter();
		});
	};
});