define([
	"Services"
],
function () {
	return function (app, controllerName) {
		app.controller(controllerName, function ($scope, $timeout, OutletRequestService, MapStateService) {
			var home = this;

			home.getOutlets = function () {
				var center = MapStateService.center;
				OutletRequestService.requestOutlets(center[0], center[1]);
			};

			MapStateService.onCenterChanged(function (center) {
				updateCenter(center);
			});

			function updateCenter(center) {
				home.center = "Lat: " + center[0] + ", Lng: " + center[1];
			}

			updateCenter(MapStateService.center);
		});
	};
});