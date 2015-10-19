define([
	"outlet_service"
],
function () {
	return function (app, controllerName) {
		app.controller(controllerName, function ($scope, OutletService) {
			$scope.name = "test";

			$scope.getOutlets = function () {
				OutletService.getOutlets();
			};
		});
	};
});