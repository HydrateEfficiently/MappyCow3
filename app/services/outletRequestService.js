define([
	"app",
	"angular"
],
function (app, angular) {
	app.factory("OutletRequestService", function ($http) {
		var outletRequestService = {},
			onOutletsRetrievedCallbacks = [];

		outletRequestService.requestOutlets = function (lat, lng) {
			return $http.get("http://localhost:9615/getOutlets?lat=" + lat + "&lng=" + lng).then(function (result) {
				outletRequestService.outlets = result.data;
				angular.forEach(onOutletsRetrievedCallbacks, function (callback) {
					callback(outletRequestService.outlets);
				});
			});
		};

		outletRequestService.onOutletsRetrieved = function (callback) {
			onOutletsRetrievedCallbacks.push(callback);
		};

		return outletRequestService;
	});
});