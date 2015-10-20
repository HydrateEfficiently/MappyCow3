define([
	"angular"
],
function (angular) {
	return function (app) {
		app.factory("OutletService", function ($rootScope, $http) {
			var outletService = {},
				onOutletsFoundCallbacks = [];

			outletService.getOutlets = function (lat, lng) {
				return $http.get("http://localhost:9615/getOutlets?lat=" + lat + "&lng=" + lng).then(function (result) {
					outletService.outlets = result.data;
					angular.forEach(onOutletsFoundCallbacks, function (callback) {
						callback(outletService.outlets);
					});
				});
			};

			outletService.onOutletsFound = function (callback) {
				onOutletsFoundCallbacks.push(callback);
			};

			return outletService;
		});
	};
});