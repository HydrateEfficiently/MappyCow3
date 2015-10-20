define([
],
function () {
	return function (app) {
		app.factory("OutletService", function ($rootScope, $http) {
			var outletService = {};

			outletService.getOutlets = function (lat, lng) {
				return $http.get("http://localhost:9615/getOutlets?lat=" + lat + "&lng=" + lng).then(function (result) {
					outletService.outlets = result.data;
					$rootScope.$broadcast("outletsFound");
				});
			};

			return outletService;
		});
	};
});