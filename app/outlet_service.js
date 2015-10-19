define([],
function () {
	return function (app) {
		app.service("OutletService", function ($http) {
			return {
				getOutlets: function (latLng) {
					return $http.get("http://localhost:9615/getOutlets?" + "lat=" + latLng.lat + "&lng=" + latLng.lng)
						.then(function (result) {
							return result.data;
						});
				}
			};
		});
	};
});